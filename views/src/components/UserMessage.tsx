import { Avatar, AvatarBadge, Box, Flex } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function UserMessage({ message, key }: { message: Message, key: number }) {
  return (
    <Flex
      marginY="5px"
      w="full"
      alignItems="center"
      justifyContent={"flex-end"}
    >
      <Box
        bg="black"
        minW="200px"
        color="white"
        borderRadius={"35px 25px 0 25px"}
        wordBreak={"break-word"}
        paddingX="15px"
        paddingY="5px"
        key={key}
        display="flex"
        alignItems="center"
        justifyContent={'flex-start'}
      >
        {message.message}
      </Box>
      <Box marginX="5px">
        <Avatar name={message.user} >
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
      </Box>
    </Flex>
  )
}
