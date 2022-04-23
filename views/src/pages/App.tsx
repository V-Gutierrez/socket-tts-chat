import { Box, Button, Flex, Text } from '@chakra-ui/react'
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

  socket.once("BROADCAST", (receivedMessage) => {
    const cleanedMessages = new Set([...messages, receivedMessage])
    setMessages(Array.from(cleanedMessages))
  })

  useEffect(() => {
    socket.once("connect", () => {
      console.log("Connected to server")
    })
  }, [])

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
    // eslint-disable-next-line
  }, [listening])

  const handleStop = () => {
    SpeechRecognition.stopListening()
    socket.emit('SEND_MESSAGE', transcript)
    TTS("Message sent!")
  }

  const handleStart = () => {
    SpeechRecognition.startListening()
  }

  return (
    <Flex w="full" h="980px" flexDir="row" color="white">
      <Flex w="100%" bg="black" h="100%" flexDir="column" alignItems={"center"} justifyContent="center">
        <Box w="50%" minW="380px" h="70%" bg="bisque" borderRadius={"20px"} marginY="20px" overflowY={"scroll"} padding="10px" display={"flex"} flexDirection="column">

          {messages.map((message, index) => {
            if (message.user === "You") {
              return <Box bg="black" marginLeft="50%" w="50%" color="white" marginY="5px" borderRadius={"15px 15px 0 15px"} padding="10px" key={index}>{message.message} - {message.user}</Box>
            } else {
              return <Box bg="gray" color="white" w="50%" marginY="5px" borderRadius={"15px 15px 15px 0"} padding="10px" key={index}>{message.message} - {message.user}</Box>
            }
          })}

        </Box>

        {listening ?
          <Text>{transcript ? transcript : 'Listening...'}</Text> :
          <Text fontWeight={200} fontSize="20px">Say something to the other side!</Text>
        }

        <Flex w="full" flexDir={"column"} alignItems={"center"} justifyContent="center">
          <Button bg="green" color="white" w="20%" marginY="10px" marginX="5px" disabled={listening} onClick={handleStart}>Record</Button>
          <Button bg="red" color="white" w="20%" marginY="10px" marginX="5px" disabled={!listening} onClick={handleStop}>Stop</Button>
        </Flex >
      </Flex >
    </Flex >
  )
}

export default App
