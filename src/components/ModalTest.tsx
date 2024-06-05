import { Box, Button, Flex, Heading, Input,Stack, Checkbox, HStack, Spinner, Spacer, useDisclosure} from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, CollectionReference, endAt } from 'firebase/firestore';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { db } from '../../firebase.config';

  export default function Modalx() {
    const [newName, setNewName] = useState('');
    const [newMark, setNewMark] = useState(0);
  
  
    const usersCollectionRef = collection(db, 'users');
  
    const [users, usersLoading, usersError] = useCollection(query(usersCollectionRef) as CollectionReference<User>);
    const createUser = async () => {
      await addDoc(usersCollectionRef, { name: newName, mark: Number(newMark)});
    };
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Create your task</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="100%" px="6" py="8">
                <HStack spacing="3">
                <Input
                    onChange={(event) => {
                    setNewName(event.target.value);
                    }}
                    placeholder="Task"
                    size="sm"
                />
                <Input
                    type="number"
                    placeholder="Priority"
                    onChange={(event) => {
                    setNewMark(Number(event.target.value));
                    }}
                    size="sm"
                />
                </HStack>
            </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
                <Button width="30%" size="sm" colorScheme="green" onClick={createUser}>
                    Create Task
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }