import React, { ChangeEvent, useState } from 'react';
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { Task } from '../models/Task';

interface CustomBoxProps {
    task: Task;
  }
  
  const TaskBox: React.FC<CustomBoxProps> = ({ task }) => {
    const [isChecked, setIsChecked] = useState(task.status);
  
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    };
  
    const getBorderColor = () => {
      switch (task.importance) {
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
        p="20px"
        width="500px"
        height="200px"
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
              {task.name}
            </Text>
            <Text fontSize="18px" color="grey">
              {task.deadline?.toDate().toLocaleString()}
            </Text>
          </Box>
          <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
        </Flex>
      </Box>
    );
  };
  
  export default TaskBox;