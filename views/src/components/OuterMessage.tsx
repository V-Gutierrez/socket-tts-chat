import { Avatar, AvatarBadge, Box, Flex, Tooltip, Text } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'

export default function OuterMessage({ message }: { message: Message }) {
  return (
    <Flex
      w="full"
      marginY="5px"
    >
      <Tooltip label={message.user}>
        <Box marginX="5px">
          <Avatar name={message.user} >
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>
        </Box>
      </Tooltip>
      <Box
        bg="gray"
        wordBreak={"break-word"}
        color="white"
        marginY="5px"
        borderRadius={"15px 15px 5px 0"}
        paddingX="20px"
        paddingY="10px"
        pb="15px"
        display="flex"
        alignItems="center"
        justifyContent={'flex-start'}
        position="relative"
      >
        <Text
          color="white"
          pos={"absolute"}
          right="10px"
          bottom="1.5%"
          fontSize={["10px"]}
        >{message.createdAt}
        </Text>
        {message.message}
      </Box>
    </Flex >
  )
}
