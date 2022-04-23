import { Avatar, Box } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function UserMessage({ message, key }: { message: Message, key: number }) {
  return (
    <Box
      bg="black"
      marginLeft="50%"
      minW="200px"
      maxW="45%"
      color="white"
      marginY="5px"
      borderRadius={"35px 35px 0 35px"}
      padding="10px"
      key={key}
      display="flex"
      alignItems="center"
      justifyContent={'flex-start'}
    >
      <Box marginX="15px">
        <Avatar name={message.user} src='https://bit.ly/kent-c-dodds' />
      </Box>
      {message.message}
    </Box>
  )
}
