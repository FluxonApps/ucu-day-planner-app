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
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Task } from '../models/Task';
import { useFetchTaskList } from '../hooks/useFetchTaskList';

import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AddTaskButton } from '../components/AddTaskButton';
import { UpdateTaskButton } from '../components/UpdateTaskButton';
const auth = getAuth();
import { BsPencilFill, BsPlusLg } from 'react-icons/bs';

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
        <AddTaskButton />
      </Box>
      <Flex gap="4" flexWrap="wrap">
        {tasks &&
          tasks?.map((task: Task) => (
            <Box gap="6" border="1px" borderColor="gray.300" width="20%" px="6" py="8" key={task.id}>
              <Heading>Name: {task.name}</Heading>
              <Heading>Deadline: {task.deadline?.toDate().toLocaleString()}</Heading>
              <Heading>Description: {task.description}</Heading>
              <Heading>Importance: {task.importance}</Heading>
              <HStack gap="4" mt="4">
                <UpdateTaskButton task={task} />
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
