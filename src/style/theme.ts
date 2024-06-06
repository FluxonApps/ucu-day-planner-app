import { extendTheme } from '@chakra-ui/react';
// import { InputStyles as Input } from './components/Input.ts';
import { BoxStyles as Box } from './components/Box.ts';

export const superTheme = extendTheme({
  colors: {
    text: '#22223B',
    background: '#F2E9E4',
    secondary: '#C9ADA7',
    highlight: '#9A8C98',
    warning: '#4A4E69',
  },
  components: {
    Box,
  },
});
