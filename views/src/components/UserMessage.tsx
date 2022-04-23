import { Avatar, Box } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function UserMessage({ message, key }: { message: Message, key: number }) {
  return (
    <Box
      bg="black"
      marginLeft="50%"
      w="50%"
      color="white"
      marginY="5px"
      borderRadius={"15px 15px 0 15px"}
      padding="10px"
      key={key}
    >
      <Avatar name={message.user} src='https://bit.ly/kent-c-dodds' />
      {message.message}
    </Box>
  )
}
