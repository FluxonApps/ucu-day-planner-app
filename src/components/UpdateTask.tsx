import { Modal, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { useState } from 'react';

import { TaskFormData } from './TaskForm';

export function UpdateTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Declaring adding task business logic here
  const handleUodateTask = (newTask: TaskFormData) => {
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
