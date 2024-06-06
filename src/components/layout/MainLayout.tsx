import { Box, Flex, Button } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { getAuth } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const auth = getAuth();
  const [signOut, isSigningOut] = useSignOut(auth);

  return (
    <Box minHeight="100vh" bg="blue.700">
      <Flex
        align="center"
        justify="space-between"
        p={4}
        bg="blue.500"
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
      </Flex>
      <Box pt={16}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
