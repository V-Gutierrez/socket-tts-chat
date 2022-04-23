import { Avatar, AvatarBadge, Box, Flex } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function OuterMessage({ message }: { message: Message }) {
  return (
    <Flex
      w="full"
      marginY="5px"
    >
      <Box marginX="5px">
        <Avatar name={message.user} >
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
      </Box>
      <Box
        bg="gray"
        wordBreak={"break-word"}
        color="white"
        marginY="5px"
        borderRadius={"25px 25px 35px 0"}
        paddingX="20px"
        display="flex"
        alignItems="center"
        justifyContent={'flex-start'}
      >
        {message.message}
      </Box>
    </Flex >
  )
}
