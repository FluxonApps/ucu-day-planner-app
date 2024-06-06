import { Modal, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { useState } from 'react';

import { TaskFormData } from './TaskForm';

export function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Declaring adding task business logic here
  const handleAddTask = (newTask: TaskFormData) => {
    // save a new task to Firestore
    // createTask(newTask);
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
        </ModalContent>
      </Modal>
    </>
  );
}
