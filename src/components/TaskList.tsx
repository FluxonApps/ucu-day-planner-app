import TaskBox from './TaskBox';
import { HStack, Box, Img, Link, Stack, Text, SimpleGrid, Spinner } from '@chakra-ui/react';

import { useFetchTaskList } from '../hooks/useFetchTaskList';


export function TaskList() {
  const [tasks, loading, error] = useFetchTaskList();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Error fetching Tasks</Box>;
  }

  return (

    <Box h="full" bg="secondary">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mx={{ base: 4, md: 20 }}>
        {tasks?.map((task) => <TaskBox task={task} key={task.id}></TaskBox>)}
      </SimpleGrid>
    </Box>
  );
}
