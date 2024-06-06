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
    <>
      {/* Start: this should be deleted whenever you're comfortable */}
      <Stack spacing={4} justifyContent="center" alignItems="center" h="full">
        <Text color="white">UCU x Fluxon Product Development Bootcamp</Text>
        <HStack mt={4} color="blue.100">
          <Link href="/firebase-demo">Firebase demo</Link>
          <Text>|</Text>
          <Link href="/auth">Authenticate</Link>
          <Text>|</Text>
          <Link href="/tasks">Tasks</Link>
        </HStack>
      </Stack>
      {/* End: this should be deleted whenever you're comfortable */}

      <Box bg={'blue.700'}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mx={{ base: 4, md: 20 }}>
          {tasks?.map((task) => <TaskBox task={task} key={task.id}></TaskBox>)}
        </SimpleGrid>
      </Box>
    </>
  );
}
