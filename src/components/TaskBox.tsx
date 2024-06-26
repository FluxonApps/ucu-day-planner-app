import {
  ModalBody,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  Box,
  Stack,
  Checkbox,
  Flex,
  Text,
} from '@chakra-ui/react';
import { updateDoc, doc, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../firebase.config';
import { Task } from '../models/Task';

import { TaskFormData, TaskForm } from './TaskForm';

interface CustomBoxProps {
  task: Task;
}

const TaskBox: React.FC<CustomBoxProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [defaultFormValues, setDefaultFormValues] = useState<TaskFormData>({
    name: task.name,
    deadline: task.deadline,
    description: task.description,
    importance: task.importance,
  });

  useEffect(() => {
    setDefaultFormValues({
      name: task.name,
      deadline: task.deadline,
      description: task.description,
      importance: task.importance,
    });
  }, [task]);

  const handleUpdateTask = async (newTask: TaskFormData) => {
    const taskDoc = doc(db, 'tasks', task.id);
    const newFields = {
      name: newTask.name,
      description: newTask.description,
      deadline: newTask.deadline,
      importance: newTask.importance,
    };
    await updateDoc(taskDoc, newFields);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = async () => {
    const taskDoc = doc(db, 'tasks', task.id);

    const newFields = {
      status: !task.status,
    };
    await updateDoc(taskDoc, newFields);
  };

  const handleBoxClick = () => {
    setIsModalOpen(true);
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
    <>
      <Box
        border="4px"
        borderColor={getBorderColor()}
        borderRadius="30px"
        p="20px"
        width="100%"
        height="200px"
        bg="background"
        opacity={task.status ? '50%' : '100%'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingLeft={{ base: '5', md: '10', xl: '20' }}
        paddingRight={{ base: '5', md: '10', xl: '20' }}
      >
        <Flex width="100%" height="100%" alignItems="center" justifyContent="space-between" onClick={handleBoxClick}>
          <Box>
            <Stack spacing="5">
              <Text fontSize="24px" color="black" textDecoration={task.status ? 'line-through' : 'none'}>
                {task.name}
              </Text>
              <Text
                fontSize="18px"
                color={Timestamp.fromDate(new Date()) > task.deadline ? 'warning' : 'grey'}
                decoration={Timestamp.fromDate(new Date()) > task.deadline ? 'underline' : 'none'}
              >
                {task.deadline?.toDate().toLocaleString()}
              </Text>
            </Stack>
          </Box>
        </Flex>
        <Checkbox colorScheme="green" size="lg" isChecked={task.status} onChange={handleCheckboxChange} />
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={handleUpdateTask} defaultValues={defaultFormValues} isUpdate={true} taskId={task.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskBox;
