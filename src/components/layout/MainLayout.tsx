// MainLayout.tsx
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children, headerContent }) => (
  <Box h="full" bg="radial-gradient(at left top, #050311 20%, #2A53C7 100%)">
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
      {headerContent}
    </Flex>
    {children}
  </Box>
);

export default MainLayout;