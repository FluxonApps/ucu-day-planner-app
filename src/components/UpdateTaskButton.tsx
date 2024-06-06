import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  HStack,
  Spinner,
  ModalFooter,
  ModalBody,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  VStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../../firebase.config';
import { useFetchTaskList } from '../hooks/useFetchTaskList';
import { Task } from '../models/Task';

import { TaskFormData, TaskForm } from './TaskForm';

const auth = getAuth();

interface IUpdateTaskButton {
  task: Task;
}

export function UpdateTaskButton({ task }: IUpdateTaskButton) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultFormValues] = useState<TaskFormData>({
    name: task.name,
    deadline: task.deadline,
    description: task.description,
    importance: task.importance,
  });
  // Declaring adding task business logic here
  const handleUpdateTask = (newTask: TaskFormData) => {
    // save an updated task to Firestore
    setIsModalOpen(false);
  };

  return (
    <>
      <Button bgColor="white" size="xs" fontSize={'2xl'} onClick={() => setIsModalOpen(true)}>
        ✎
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={handleUpdateTask} defaultValues={defaultFormValues} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
