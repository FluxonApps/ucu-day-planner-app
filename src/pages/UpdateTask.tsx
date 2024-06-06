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
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Task } from '../models/Task';
import { useFetchTaskList } from '../hooks/useFetchTaskList';

import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();
import { AddIcon } from '@chakra-ui/icons';

import { TaskFormData, TaskForm } from './TaskForm';

export function UpdateTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Declaring adding task business logic here
  const handleUpdateTask = (newTask: TaskFormData) => {
    // save an updated task to Firestore
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Pencil icon</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={handleUodateTask} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
