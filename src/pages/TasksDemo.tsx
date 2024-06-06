import { AddIcon } from '@chakra-ui/icons';
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
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../../firebase.config';
import { UpdateTaskButton } from '../components/UpdateTaskButton';
import { useFetchTaskList } from '../hooks/useFetchTaskList';
import { Task } from '../models/Task';

const auth = getAuth();

export function TasksDemo() {
  const [newTask, setNewName] = useState('');
  const [newDeadline, setNewDeadline] = useState<Timestamp | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImportance, setNewImportance] = useState(1);

  const [user] = useAuthState(auth);

  const [tasks, tasksLoading, tasksError] = useFetchTaskList();

  const { isOpen: isOpenCreating, onOpen: onOpenCreating, onClose: onCloseCreating } = useDisclosure();
  const { isOpen: isOpenEditing, onOpen: onOpenEditing, onClose: onCloseEditing } = useDisclosure();

  if (tasksLoading) {
    return <Spinner />;
  }

  if (tasksError) {
    return <Box>Error fetching Tasks</Box>;
  }

  const tasksCollectionRef = collection(db, 'tasks');

  const createTask = async () => {
    await addDoc(tasksCollectionRef, {
      name: String(newTask),
      deadline: newDeadline,
      description: newDescription,
      activated: true,
      importance: Number(newImportance),
      status: true,
      userId: user?.uid,
    });
    setNewName('');
    setNewDeadline(null);
    setNewDescription('');
    setNewImportance(1);
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
              <Heading fontSize={30}>Create a new Task</Heading>
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
                <Box>Choose the level of importance:</Box>
                <RadioGroup
                  onChange={(value) => {
                    setNewImportance(Number(value));
                  }}
                  size="sm"
                  defaultValue="1"
                >
                  <Stack direction="row">
                    <Radio value="1">Low</Radio>
                    <Radio value="2">Medium</Radio>
                    <Radio value="3">High</Radio>
                  </Stack>
                </RadioGroup>
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

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Flex gap="4" flexWrap="wrap">
        {tasks &&
          tasks.map((task: Task) => (
            <Box gap="6" border="1px" borderColor="gray.300" width="20%" px="6" py="8" key={task.id}>
              <Heading>Name: {task.name}</Heading>
              <Heading>Deadline: {task.deadline?.toDate().toLocaleString()}</Heading>
              <Heading>Description: {task.description}</Heading>
              <Heading>Importance: {task.importance}</Heading>
              <HStack gap="4" mt="4">
                <UpdateTaskButton key={task.id} task={task} />
                <Modal isOpen={isOpenEditing} onClose={onCloseEditing}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader> Editing</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="100%" px="6" py="8">
                        <Stack spacing="3">
                          <Input
                            defaultValue={task.name}
                            onChange={(event) => {
                              setNewName(event.target.value);
                            }}
                            placeholder="Name of Task..."
                            size="sm"
                          />
                          <Input
                            type="datetime-local"
                            defaultValue={task.deadline?.toDate().toISOString().slice(0, 16)}
                            onChange={(event) => {
                              const date = new Date(event.target.value);
                              const timestamp = Timestamp.fromDate(date);
                              setNewDeadline(timestamp);
                            }}
                            size="sm"
                          />
                          <Input
                            defaultValue={task.description}
                            placeholder="Description..."
                            onChange={(event) => {
                              setNewDescription(event.target.value);
                            }}
                            size="sm"
                          />
                          <Box>Choose the level of importance:</Box>
                          <RadioGroup
                            onChange={(value) => {
                              setNewImportance(Number(value));
                            }}
                            size="sm"
                            defaultValue={String(task.importance)}
                          >
                            <Stack direction="row">
                              <Radio value="1">Low</Radio>
                              <Radio value="2">Medium</Radio>
                              <Radio value="3">High</Radio>
                            </Stack>
                          </RadioGroup>
                        </Stack>
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button width="30%" size="sm" colorScheme="green" onClick={updateTask}>
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
