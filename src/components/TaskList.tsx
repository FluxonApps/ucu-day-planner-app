import TaskBox from './TaskBox';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';

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

    <Box h="full" bg="secondary" alignItems="left">
      <SimpleGrid columns={[1, 2, 3]} spacing="1%" padding="1%" >
        {tasks?.map((task) => <TaskBox task={task} key={task.id}></TaskBox>)}
      </SimpleGrid>
    </Box>
  );
}
