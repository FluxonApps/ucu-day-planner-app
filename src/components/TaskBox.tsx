import React, { ChangeEvent, useState } from 'react';
import { Box, Stack, Checkbox, Flex, Text } from '@chakra-ui/react';

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Task } from '../models/Task';

interface CustomBoxProps {
  task: Task;
}

const TaskBox: React.FC<CustomBoxProps> = ({ task }) => {

  const handleCheckboxChange = async () => {
    const taskDoc = doc(db, 'tasks', task.id);

    const newFields = {
      status: !task.status
    };
    await updateDoc(taskDoc, newFields);

  };

  const getBorderColor = () => {
    switch (task.importance) {
      case 1:
        return 'background';
      case 2:
        return 'rgba(68,83,80,0.5)';
      case 3:
        return 'warning';
      default:
        return 'background';
    }
  };

  return (
    <Box
      border="4px"
      borderColor={getBorderColor()}
      borderRadius="30px"
      p="20px"
      width="100%"
      height="200px"
      bg="background"
      opacity={task.status ? "50%" : "100%"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex width="80%" alignItems="center" justifyContent="space-between">
        <Box >
          <Stack spacing="5">
            <Text
              fontSize="24px"
              color="black"
              textDecoration={task.status ? 'line-through' : 'none'}
            >
              {task.name}
            </Text>
            <Text fontSize="18px" color="grey">
              {task.deadline?.toDate().toLocaleString()}
            </Text>
          </Stack>
        </Box>
        <Checkbox colorScheme='green' size="lg" isChecked={task.status} onChange={handleCheckboxChange} />
      </Flex>
    </Box >
  );
};

export default TaskBox;
