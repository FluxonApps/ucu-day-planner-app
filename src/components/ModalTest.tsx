import { Box, Button, Flex, Heading, Input,Stack, Checkbox, HStack, Spinner, Spacer, useDisclosure, VStack} from '@chakra-ui/react';
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
    interface User {
        id: string;
        name: string;
        mark: number;
      }
  
    const usersCollectionRef = collection(db, 'users');
    const deleteUser = async (id: string) => {
        const userDoc = doc(db, 'users', id);
        await deleteDoc(userDoc);
      };
    const [users, usersLoading, usersError] = useCollection(query(usersCollectionRef) as CollectionReference<User>);
    const createUser = async () => {
      await addDoc(usersCollectionRef, { name: newName, mark: Number(newMark)});
    };
    const { isOpen: isOpenCreating, onOpen: onOpenCreating, onClose: onCloseCreating } = useDisclosure()
    const { isOpen: isOpenEditing, onOpen: onOpenEditing, onClose : onCloseEditing } = useDisclosure()
    return (
      <>
        <Box textAlign={'right'}>
        <Button onClick={onOpenCreating}>Create your task</Button>
        </Box>
        <Modal isOpen={isOpenCreating} onClose={onCloseCreating}>
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
              <Button colorScheme='blue' mr={3} onClick={onCloseCreating}>
                Close
              </Button>
                <Button width="30%" size="sm" colorScheme="green" onClick={createUser}>
                    Create Task
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex gap={5} p={6}>
        {users &&
          users.docs.map((user) => (
            <Box  gap="6" border="1px" borderColor="gray.300" width="15%"  key={user.id}>
              <HStack py= '1' gap="2">
                {/* <Button size="sm" colorScheme="green" onClick={() => updateUser(user.id, user.data().mark)}>
                  Increase Mark
                </Button> */}

                <Spacer></Spacer>
                <Button bgColor = 'white' size = 'xs' fontSize={'2xl'} onClick={onOpenEditing}>
                ✎
                </Button>
                <Modal isOpen={isOpenEditing} onClose={onCloseEditing}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{user.data().name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="100%" px="6" py="8">
                        <VStack spacing="3">
                        <Input
                            onChange={(event) => {
                            setNewName(event.target.value);
                            }}
                            placeholder={user.data().name}

                            size="sm">

                        </Input>
                        <Input
                            type="number"
                            placeholder={user.data().mark}
                            onChange={(event) => {
                            setNewMark(Number(event.target.value));
                            }}
                            size="sm">
                        </Input>
                        </VStack>
                    </Flex>
                    </ModalBody>

                    <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onCloseEditing}>
                        Close
                    </Button>
                        <Button width="30%" size="sm" colorScheme="green" onClick={createUser}>
                            Edit Task
                        </Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
                <Button size='xs' bgColor='white' textColor='red'  onClick={() => deleteUser(user.id)}>
                  x
                </Button>
              </HStack>
              <Heading margin={4} fontSize='2xl'>Task: {user.data().name}</Heading>
              <Heading margin={4} fontSize='2xl'>Priority {user.data().mark}</Heading>
              <Flex>
                <Spacer></Spacer>
                <Checkbox py={2} px={2} border = {2}></Checkbox>
              </Flex>
            </Box>
          ))}
      </Flex>
      </>
    )
  }