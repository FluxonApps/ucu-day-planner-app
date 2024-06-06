import { Box, Button, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { Task } from '../models/Task';
import { useFetchTaskList } from '../hooks/useFetchTaskList';

import { db } from '../../firebase.config';

import { AddTaskButton } from '../components/AddTaskButton';
import { UpdateTaskButton } from '../components/UpdateTaskButton';

export function TasksDemo() {
  const [tasks, tasksLoading, tasksError] = useFetchTaskList();
  if (tasksLoading) {
    return <Spinner />;
  }

  if (tasksError) {
    return <Box>Error fetching Tasks</Box>;
  }

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
