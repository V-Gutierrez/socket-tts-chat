import { Flex, Text } from '@chakra-ui/react'
import Input from 'components/Input'
import Messages from 'components/Messages'
import SignIn from 'components/SignIn'

function App() {
  return (
    <Flex w="full" h="980px" flexDir="row" color="white">
      <Flex w="100%" bg="black" h="100%" flexDir="column" alignItems={"center"} justifyContent="center">
        <Text fontSize={["16px", "32px"]} mb="35px">TTS Chat</Text>
        <SignIn />
        <Messages />
        <Input />
      </Flex >
    </Flex >
  )
}

export default App
