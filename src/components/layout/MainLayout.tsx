import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const MainLayout: FC<any> = ({ children }) => (
  <Box h="full" bg="#C9ADA7">
    {children}
  </Box>
);

export default MainLayout;
