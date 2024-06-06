import { Button, ModalBody, ModalContent, Modal, ModalHeader, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { updateDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

import { db } from '../../firebase.config';
import { Task } from '../models/Task';

import { EditIcon } from '@chakra-ui/icons';

import { TaskFormData, TaskForm } from './TaskForm';
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

  const handleUpdateTask = async (newTask: TaskFormData) => {
    const taskDoc = doc(db, 'tasks', task.id);
    const newFields = { name: newTask.name, description: newTask.description, deadline: newTask.deadline };
    await updateDoc(taskDoc, newFields);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button bgColor="white" size="xs" fontSize={'2xl'} onClick={() => setIsModalOpen(true)}>
        <EditIcon />
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onSubmit={handleUpdateTask} defaultValues={defaultFormValues} isUpdate={true} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
