import { useUserContext } from 'context/UserContext'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Input,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSocketContext } from 'context/SocketContext'
import Logo from 'assets/imgs/logo512.png'
import { timestamp } from 'utils/time'

export default function SignIn() {
  const { setUsername, username, storeUserName } = useUserContext()
  const { Socket } = useSocketContext()
  const [isModalVisible, setIsModalVisible] = useState(username === null)

  const handleClose = () => {
    if (username) {
      setIsModalVisible(false)
      storeUserName()
      Socket.emit("SEND_MESSAGE", { message: `${username} has joined the chat`, user: username, signin: true, createdAt: timestamp() })
    }
  }

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <Modal isOpen={isModalVisible} onClose={handleClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
      <ModalContent>
        <ModalHeader textAlign={"center"}>
          <Image src={Logo} w={["35%"]} margin="0 auto" />
          <Text >Create an username to continue</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input onChange={handleUsernameInput} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='whatsapp' mr={3} onClick={handleClose}>
            Create Username
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
