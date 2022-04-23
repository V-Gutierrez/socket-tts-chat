import { Avatar, AvatarBadge, Box } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function OuterMessage({ message, key }: { message: Message, key: number }) {
  return (
    <Box
      bg="gray"
      color="white"
      w="50%"
      marginY="5px"
      borderRadius={"35px 35px 35px 0"}
      padding="10px"
      key={key}
      display="flex"
      alignItems="center"
      justifyContent={'flex-start'}
      minW="200px"
      maxW="45%"
    >
      {message.message}
      <Box marginX="15px">
        <Avatar name={message.user} src='https://bit.ly/dan-abramov' />
        <AvatarBadge boxSize='1.25em' bg='green.500' />
      </Box>
    </Box>
  )
}
