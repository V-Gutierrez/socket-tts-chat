import { Flex } from '@chakra-ui/react'
import Input from 'components/Input'
import Messages from 'components/Messages'
import SignIn from 'components/SignIn'

function App() {
  return (
    <Flex w="full" h="980px" flexDir="row" color="white">
      <Flex w="100%" bg="black" h="100%" flexDir="column" alignItems={"center"} justifyContent="center">
        <h1>TTS Chat</h1>
        <SignIn />
        <Messages />
        <Input />
      </Flex >
    </Flex >
  )
}

export default App
