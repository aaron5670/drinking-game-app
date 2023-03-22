import {
  Button, FormControl, FormLabel, Input,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React, {useState} from "react";

function CreateGameModal({createGameRoom}: { createGameRoom: (roomName: string) => void }) {
  const [roomName, setRoomName] = useState(`room-${Math.floor(Math.random() * 999)}`);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen} colorScheme="whatsapp">Create game</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Room name</FormLabel>
              <Input
                placeholder="Aaron's room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' mr={3} onClick={() => createGameRoom(roomName)} ref={initialRef}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGameModal;
