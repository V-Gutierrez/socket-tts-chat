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
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function SignIn() {
  const { setUsername, username, storeUserName } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(username === null)

  const handleClose = () => {
    if (username) {
      setIsModalVisible(false)
      storeUserName()
    }
  }

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <Modal isOpen={isModalVisible} onClose={handleClose}>
      <ModalOverlay bg="whatsapp.100" />
      <ModalContent>
        <ModalHeader>Create an username to continue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input onChange={handleUsernameInput} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleClose}>
            Create Username
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
