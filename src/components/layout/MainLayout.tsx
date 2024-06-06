import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const MainLayout: FC<any> = ({ children }) => (
  <Box h="full" bg="secondary">
    {children}
  </Box>
);

export default MainLayout;
