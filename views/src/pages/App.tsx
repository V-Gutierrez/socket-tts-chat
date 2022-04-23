import { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import socketClient from "socket.io-client"
import { debounce } from "lodash"

const socket = socketClient()

function App() {
  const {
    listening,
    finalTranscript
  } = useSpeechRecognition()
  const [messages, setMessages] = useState<{ message: string, user: string }[]>([])


  useEffect(() => {
    socket.once("connect", () => {
      console.log("Connected to server")
    })
  }, [])

  useEffect(() => {
    socket.once("BROADCAST", (receivedMessage) => {
      debounce(() => setMessages(prev => [...prev, receivedMessage]), 2500)()
    })

    if (finalTranscript && !listening) {
      socket.emit('SEND_MESSAGE', finalTranscript)
    }
  }, [listening])

  return (
    <div>
      {listening ? <div>Listening...</div> : <div>Say something!</div>}
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>

      {messages.map((message, index) => {
        return <li key={index}>{message.message} - {message.user}</li>
      })}
    </div>
  )
}

export default App
