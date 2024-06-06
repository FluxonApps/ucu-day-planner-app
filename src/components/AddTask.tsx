import {
  Button,
  ModalBody,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/react';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { BsPlusLg } from 'react-icons/bs';

const auth = getAuth();

import { TaskFormData, TaskForm } from './TaskForm';

export function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user] = useAuthState(auth);

  const tasksCollectionRef = collection(db, 'tasks');

  const handleAddTask = async (newTask: TaskFormData) => {
    await addDoc(tasksCollectionRef, {
      name: newTask.name,
      deadline: newTask.deadline,
      description: newTask.description,
      activated: true,
      importance: Number(newTask.importance),
      status: true,
      userId: user?.uid,
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <BsPlusLg />
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={handleAddTask} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
