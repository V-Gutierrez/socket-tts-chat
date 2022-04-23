import { Flex, Box, Button, Text } from '@chakra-ui/react'
import { useSocketContext } from 'context/SocketContext'
import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { TTS } from 'services/TTS'

export default function Input() {
  const { listening, finalTranscript, transcript } = useSpeechRecognition()
  const { messages, setMessages, Socket } = useSocketContext()


  useEffect(() => {
    if (finalTranscript && !listening) {
      Socket.emit('SEND_MESSAGE', finalTranscript)
      setMessages(prev => [...prev, ...[{ message: finalTranscript, user: "You" }]])
      TTS("Message sent!")
    }
    // eslint-disable-next-line
  }, [listening])

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].user !== "You") {
      TTS("Message received! Last message was: " + messages[messages.length - 1].message)
    }
  }, [messages])

  const handleStop = () => {
    SpeechRecognition.stopListening()
    Socket.emit('SEND_MESSAGE', transcript)
    TTS("Message sent!")
  }

  const handleStart = () => {
    SpeechRecognition.startListening()
  }

  return (
    <>
      {listening ?
        <Text>{transcript ? transcript : 'Listening...'}</Text> :
        <Text fontWeight={200} fontSize="20px">Say something to the other side!</Text>
      }

      <Flex w="full" flexDir={"column"} alignItems={"center"} justifyContent="center">
        <Button bg="green" color="white" w="20%" marginY="10px" marginX="5px" disabled={listening} onClick={handleStart}>Record</Button>
        <Button bg="red" color="white" w="20%" marginY="10px" marginX="5px" disabled={!listening} onClick={handleStop}>Stop</Button>
      </Flex >
    </>
  )
}
