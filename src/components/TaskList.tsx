import { Box,Link,SimpleGrid, Spinner, Button } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { useFetchTaskList } from '../hooks/useFetchTaskList';
import { useSignOut } from 'react-firebase-hooks/auth';
import TaskBox from './TaskBox.tsx';

import MainLayout from './layout/MainLayout.tsx';

const auth = getAuth();

export function TaskList() {
  const [tasks, loading, error] = useFetchTaskList();
  const [signOut, isSigningOut] = useSignOut(auth);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Error fetching Tasks</Box>;
  }

  return (
    <MainLayout
      headerContent={
        <>
          <Button onClick={signOut} isDisabled={isSigningOut} isLoading={isSigningOut}>
            Sign out
          </Button>
          <Button as={Link} href="/tasks" ml={2}>
            Tasks
          </Button>
        </>
      }
    >
      <Box bg={'blue.700'}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mx={{ base: 4, md: 20 }}>
          {tasks?.map((task) => <TaskBox task={task} key={task.id}></TaskBox>)}
        </SimpleGrid>
      </Box>
    </MainLayout>
  );
}
