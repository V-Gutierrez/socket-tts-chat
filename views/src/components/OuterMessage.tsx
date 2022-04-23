import { Avatar, Box } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function OuterMessage({ message, key }: { message: Message, key: number }) {
  return (
    <Box
      bg="gray"
      color="white"
      w="50%"
      marginY="5px"
      borderRadius={"15px 15px 15px 0"}
      padding="10px"
      key={key}
    >
      <Avatar name={message.user} src='https://bit.ly/dan-abramov' />
      {message.message}
    </Box>
  )
}
