import React, { useState } from 'react';
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';


interface CustomBoxProps {
    importance: 1 | 2 | 3;
    taskName: string;
    deadline: string;
  }

const CustomBox: React.FC<CustomBoxProps> = ({ importance, taskName, deadline }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(e.target.checked);
  };

  const getBorderColor = () => {
    switch (importance) {
      case 1:
        return 'red';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
      default:
        return 'red';
    }
  };

  return (
    <Box
      border="2px"
      borderColor={getBorderColor()}
      borderRadius="15px"
      p="5px"
      width="300px"
      height="140px"
      margin="20px"
      bg={isChecked ? 'rgba(217, 217, 217, 0.5)' : '#D9D9D9'}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Box>
          <Text
            fontSize="24px"
            color="black"
            textDecoration={isChecked ? 'line-through' : 'none'}
          >
            {taskName}
          </Text>
          <Text fontSize="18px" color="grey">
            {deadline}
          </Text>
        </Box>
        <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
      </Flex>
    </Box>
  );
};

export default CustomBox;