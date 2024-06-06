import { ComponentStyleConfig } from '@chakra-ui/react';

export const BoxStyles: ComponentStyleConfig = {
  baseStyle: {
    bg: 'white',
  },
  variants: {
    primary: {
      bg: 'background',
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
  },
};
