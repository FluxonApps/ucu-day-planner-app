import { Box, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { useFetchTaskList } from '../hooks/useFetchTaskList';
import TaskBox from './TaskBox.tsx';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

export function TaskList() {
  const [tasks, loadingTasks, error] = useFetchTaskList();
  const auth = getAuth();
  const [user, loadingAuth] = useAuthState(auth);

  if (loadingAuth || loadingTasks) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return <Box>Error fetching Tasks</Box>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }


  return (
    <Box bg={'blue.700'}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mx={{ base: 4, md: 20 }}>
        {tasks?.map((task) => <TaskBox task={task} key={task.id}></TaskBox>)}
      </SimpleGrid>
    </Box>
  );
}
