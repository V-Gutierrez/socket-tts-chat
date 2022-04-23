import { Flex, Button, InputGroup, FormControl, Input as FormInput, Spinner } from '@chakra-ui/react'
import { useSocketContext } from 'context/SocketContext'
import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { TTS } from 'services/TTS'

export default function Input() {
  const { listening, finalTranscript, transcript } = useSpeechRecognition()
  const { messages, setMessages, Socket } = useSocketContext()
  const [textMessage, setTextMessage] = useState('')


  useEffect(() => {
    if (finalTranscript && !listening) {
      Socket.emit('SEND_MESSAGE', finalTranscript)
      setMessages(prev => [...prev, ...[{ message: finalTranscript, user: "You" }]])
      TTS("Message sent!")
      setTextMessage('')
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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
  }

  const handleSending = () => {
    if (textMessage.length > 0) {
      Socket.emit('SEND_MESSAGE', finalTranscript)
      setMessages(prev => [...prev, ...[{ message: textMessage, user: "You" }]])
      setTextMessage('')
      TTS("Message sent!")
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSending()
    }
  }

  return (
    <Flex w="50%" flexDir={["column", "column", "column", "column", "row"]}>
      <FormControl isRequired>
        <InputGroup>
          <FormInput value={textMessage} placeholder={listening ? transcript ? transcript : 'Listening...' : "Say or type something"} onChange={handleTextChange} onKeyDown={handleEnter} />
        </InputGroup>
      </FormControl>

      <Flex w="full" flexDir={["row"]} marginTop={["15px", "15px", "15px", "15px", 0]} alignItems={"center"} justifyContent="center">
        <Button fontSize={['12px', '12px', '14px', '16px']} bg="blue.400" color="white" w="100px" ml={"30px"} mr={"15px"} disabled={listening} onClick={handleSending}>Send Text</Button>
        <Button fontSize={['12px', '12px', '14px', '16px']} bg="green" color="white" w="100px" mr={"15px"} disabled={listening} onClick={handleStart}>{listening ? <Spinner /> : 'Record TTS'}</Button>
        <Button fontSize={['12px', '12px', '14px', '16px']} bg="red" color="white" w="135px" disabled={!listening} onClick={handleStop}>Stop Recording</Button>
      </Flex >

    </Flex >
  )
}
