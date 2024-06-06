import { Box, Flex, Button, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { getAuth } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';

import { AddTaskButton } from '../AddTaskButton';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const auth = getAuth();
  const [signOut, isSigningOut] = useSignOut(auth);
  const theme = useTheme();

  return (
    <Box minHeight="100vh" bg={theme.colors.secondary}>
      <Flex
        align="center"
        justify="space-between"
        p={4}
        bg={theme.colors.highlight}
        color="white"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={999}
        width="100%"
      >
        <Button onClick={signOut} isDisabled={isSigningOut} isLoading={isSigningOut}>
          Sign out
        </Button>
        <AddTaskButton />
      </Flex>
      <Box pt={16}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
