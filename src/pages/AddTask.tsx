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
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';

import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();

import { TaskFormData, TaskForm } from './TaskForm';

export function TasksDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newDeadline, setNewDeadline] = useState<Timestamp | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImportance, setNewImportance] = useState(1);

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
    setNewName('');
    setNewDeadline(null);
    setNewDescription('');
    setNewImportance(1);

    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>+</Button>
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
