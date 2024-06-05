import { HStack, Box, Img, Link, Stack, Text } from '@chakra-ui/react';
// import { TasksDemo } from '../pages/TasksDemo';

import fluxonLogo from '../assets/fluxon-logo.svg';
import { useFetchTaskList } from '../hooks/useFetchTaskList';


export function TaskList() {
  const tasks = useFetchTaskList();

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

      <Box bg={'orange'}>Task list may go here here</Box>
    </>
  );
}
