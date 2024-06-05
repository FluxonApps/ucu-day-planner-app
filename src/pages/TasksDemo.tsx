import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  HStack,
  Spinner,
  ModalFooter,
  ModalBody,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  VStack,
  useEditableControls,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  CollectionReference,
  Timestamp,
  DocumentReference,
} from 'firebase/firestore';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Task } from '../models/Task';

import { db } from '../../firebase.config';
import { AddIcon } from '@chakra-ui/icons';

export function TasksDemo() {
  const [newTask, setNewName] = useState('');
  const [newDeadline, setNewDeadline] = useState<Timestamp | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImportance, setNewImportance] = useState(0);
  const { isOpen: isOpenCreating, onOpen: onOpenCreating, onClose: onCloseCreating } = useDisclosure();
  const { isOpen: isOpenEditing, onOpen: onOpenEditing, onClose: onCloseEditing } = useDisclosure();
  const tasksCollectionRef = collection(db, 'tasks');
  // const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
  const [tasks, tasksLoading, tasksError] = useCollection(query(tasksCollectionRef) as CollectionReference<Task>);

  const createTask = async () => {
    await addDoc(tasksCollectionRef, {
      name: String(newTask),
      deadline: newDeadline,
      description: newDescription,
      activated: true,
      importance: Number(newImportance),
      status: true,
      uuid: 'test',
    });
  };
  const updateTask = async (
    id: string,
    updatedName: string,
    updatedDescription: string,
    updatedDeadline: Timestamp,
  ) => {
    const taskDoc = doc(db, 'tasks', id);
    const newFields = { name: updatedName, description: updatedDescription, deadline: updatedDeadline };
    await updateDoc(taskDoc, newFields);
  };
  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  };

  if (tasksLoading) {
    return <Spinner />;
  }
  const EditTask = async (id: string, name: string, prorities: number, description: string, deadline: Timestamp) => {};
  if (tasksError) {
    return <Box>Error fetching Tasks</Box>;
  }

  return (
    <Flex flexDir="column" gap="8" padding="6">
      <Box textAlign={'right'}>
        <Button bg="gainsboro" onClick={onOpenCreating}>
          {<AddIcon />}
        </Button>
      </Box>
      <Modal isOpen={isOpenCreating} onClose={onCloseCreating}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack flexDir="column" gap={7}>
              <Box>"Name of the Tasks"</Box>
              <Stack spacing="3">
                <Input
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                  placeholder="Name of Task..."
                  size="sm"
                />
                <Input
                  type="datetime-local"
                  onChange={(event) => {
                    const date = new Date(event.target.value);
                    const timestamp = Timestamp.fromDate(date);
                    setNewDeadline(timestamp);
                  }}
                  size="sm"
                />
                <Input
                  placeholder="Description..."
                  onChange={(event) => {
                    setNewDescription(event.target.value);
                  }}
                  size="sm"
                />
                <Input
                  type="number"
                  placeholder="Importance..."
                  onChange={(event) => {
                    setNewImportance(Number(event.target.value));
                  }}
                  size="sm"
                />
              </Stack>

              <Button
                width="50%"
                size="sm"
                colorScheme="green"
                onClick={() => {
                  createTask();
                  onCloseCreating();
                }}
              >
                Create Task
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/* <Button width="30%" size="sm" colorScheme="green" onClick={createUser}>
              Create Task
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex gap="4" flexWrap="wrap">
        {tasks &&
          tasks.docs.map((task) => (
            <Box gap="6" border="1px" borderColor="gray.300" width="20%" px="6" py="8" key={task.id}>
              <Heading>Name: {task.data().name}</Heading>
              <Heading>Deadline: {task.data().deadline?.toDate().toLocaleString()}</Heading>
              <Heading>Description: {task.data().description}</Heading>
              <Heading>Importance: {task.data().importance}</Heading>
              <HStack gap="4" mt="4">
                <Button bgColor="white" size="xs" fontSize={'2xl'} onClick={onOpenEditing} key={task.id}>
                  ✎
                </Button>
                <Modal isOpen={isOpenEditing} onClose={onCloseEditing}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader> Editing</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="100%" px="6" py="8">
                        <VStack spacing="3" align={'left'}>
                          <Editable
                            defaultValue="Take some chakra"
                            border={'1px'}
                            px={'10px'}
                            py={'5px'}
                            borderColor={'gray.300'}
                          >
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                          <Editable
                            defaultValue="Take some chakra"
                            border={'1px'}
                            px={'10px'}
                            py={'5px'}
                            borderColor={'gray.300'}
                          >
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                          <Editable
                            defaultValue="Take some chakra"
                            border={'1px'}
                            px={'10px'}
                            py={'5px'}
                            borderColor={'gray.300'}
                          >
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                          <Editable
                            defaultValue="Take some chakra"
                            border={'1px'}
                            px={'10px'}
                            py={'5px'}
                            borderColor={'gray.300'}
                          >
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                          <Editable
                            defaultValue="Take some chakra"
                            border={'1px'}
                            px={'10px'}
                            py={'5px'}
                            borderColor={'gray.300'}
                          >
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                        </VStack>
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button width="30%" size="sm" colorScheme="green" onClick={EditTask}>
                        Edit Task
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Button size="sm" colorScheme="red" onClick={() => deleteTask(task.id)}>
                  Delete Task
                </Button>
              </HStack>
            </Box>
          ))}
      </Flex>
    </Flex>
  );
}
