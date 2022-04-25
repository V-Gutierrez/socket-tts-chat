import { Avatar, AvatarBadge, Box, Flex, Text } from '@chakra-ui/react'
import { Message } from 'context/SocketContext'
import { Tooltip } from '@chakra-ui/react'
import { useUserContext } from 'context/UserContext'

export default function UserMessage({ message }: { message: Message }) {
  const { username } = useUserContext()

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
      <Tooltip label={username}>
        <Box marginX="5px" cursor="pointer">
          <Avatar name={message.user} >
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>
        </Box>
      </Tooltip>
    </Flex>
  )
}
