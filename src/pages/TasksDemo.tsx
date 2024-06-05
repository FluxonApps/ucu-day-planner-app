import { Box, Button, Flex, Heading, Input, Stack, HStack, Spinner } from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp, DocumentReference } from 'firebase/firestore';
import { useState } from 'react';
import { Task } from '../models/Task';
import { useFetchTaskList } from '../hooks/useFetchTaskList';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../../firebase.config';


const auth = getAuth();

export function TasksDemo() {
  const [newTask, setNewName] = useState('');
  const [newDeadline, setNewDeadline] = useState<Timestamp | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImportance, setNewImportance] = useState(0);


  const [user] = useAuthState(auth);

  const tasksCollectionRef = collection(db, 'tasks');

  const tasks = useFetchTaskList();

  const createTask = async () => {
    await addDoc(tasksCollectionRef, { name: String(newTask), deadline: newDeadline, description: newDescription, activated: true, importance: Number(newImportance), status: true, uuid: user?.uid });
  };
  const updateTask = async (taskDoc: DocumentReference, updatedName: string, updatedDescription: string, updatedDeadline: Timestamp) => {
    const newFields = { name: updatedName, description: updatedDescription, deadline: updatedDeadline };
    await updateDoc(taskDoc, newFields);
  };
  const deleteTask = async (taskDoc: DocumentReference) => {
    await deleteDoc(taskDoc);
  };

  // if (!tasks) {
  // return <Spinner />;
  // }

  // if (tasksError) {
  // return <Box>Error fetching Tasks</Box>;
  // }

  return (
    <Flex flexDir="column" gap="8" padding="6">
      <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="20%" px="6" py="8">
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
            type='number'
            placeholder="Importance..."
            onChange={(event) => {
              setNewImportance(Number(event.target.value));
            }}
            size="sm"
          />
        </Stack>
        <Button width="50%" size="sm" colorScheme="green" onClick={createTask}>
          Create Task
        </Button>
      </Flex>
      <Flex gap="4" flexWrap="wrap">
        {tasks &&
          tasks.map((task: Task) => (
            <Box gap="6" border="1px" borderColor="gray.300" width="20%" px="6" py="8" key={task.name}>
              <Heading>Name: {task.name}</Heading>
              <Heading>Deadline: {task.deadline?.toDate().toLocaleString()}</Heading>
              <Heading>Description: {task.description}</Heading>
              <Heading>Importance: {task.importance}</Heading>
              <HStack gap="4" mt="4">
                <Button size="sm" colorScheme="green" onClick={() => updateTask(task.ref, task.name, task.description, task.deadline)}>
                  Change Task (doesn't really do anything)
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => deleteTask(task.ref)}>
                  Delete Task
                </Button>
              </HStack>
            </Box>
          ))}
      </Flex>
    </Flex>
  );
}
