import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { TTS } from 'services/TTS'
import socketClient from "socket.io-client"

const socket = socketClient()

function App() {
  const {
    listening,
    finalTranscript,
    transcript
  } = useSpeechRecognition()
  const [messages, setMessages] = useState<{ message: string, user: string }[]>([])

  useEffect(() => {
    socket.once("connect", () => {
      console.log("Connected to server")
    })
  }, [])

  socket.once("BROADCAST", (receivedMessage) => {
    const cleanedMessages = new Set([...messages, receivedMessage])
    setMessages(Array.from(cleanedMessages))
  })

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].user !== "You") {
      TTS("Message received! Last message was: " + messages[messages.length - 1].message)
    }
  }, [messages])


  useEffect(() => {
    if (finalTranscript && !listening) {
      socket.emit('SEND_MESSAGE', finalTranscript)
      setMessages(prev => [...prev, ...[{ message: finalTranscript, user: "You" }]])
      TTS("Message sent!")
    }
  }, [listening])

  const handleStop = () => {
    SpeechRecognition.stopListening()
    socket.emit('SEND_MESSAGE', transcript)
    TTS("Message sent!")
  }

  return (
    <div>
      {listening ? <div>Listening...</div> : <div>Say something to the other side!</div>}

      <button disabled={listening} onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button disabled={!listening} onClick={handleStop}>Stop</button>

      {messages.map((message, index) => {
        return <li key={index}>{message.message} - {message.user}</li>
      })}
    </div>
  )
}

export default App
