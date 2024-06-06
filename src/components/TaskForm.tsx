import { DeleteIcon } from '@chakra-ui/icons';
import { Button, HStack, Heading, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import CustomCalendar from './CustomCalendar';

import { db } from '../../firebase.config';
import { Task } from '../models/Task';

export interface TaskFormData {
  name: string;
  deadline: Timestamp | null;
  description: string;
  importance: number;
}

interface ITaskForm {
  defaultValues?: TaskFormData;
  onSubmit: (newTask: TaskFormData) => void;
  taskId?: string;
}

export function TaskForm({ onSubmit, defaultValues, taskId }: ITaskForm) {
  const [name, setName] = useState(defaultValues?.name ?? '');
  const [deadline, setDeadline] = useState<Timestamp | null>(defaultValues?.deadline ?? null);
  const [description, setDescription] = useState(defaultValues?.description ?? '');
  const [importance, setImportance] = useState(defaultValues?.importance ?? 1);

  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  };

  return (
    <Stack spacing="3">
      <Input
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
        placeholder="Name of Task..."
        size="sm"
        borderRadius="15"
        borderWidth="3"
        borderColor="highlight"
        _focusVisible={{ borderWidth: '3px', borderColor: 'secondarytext' }}
        bg="background"
        color="secondarytext"
      />
      <CustomCalendar
        selectedDate={deadline ? deadline.toDate() : null}
        onDateChange={(timestamp) => {
          setDeadline(timestamp);
        }}
        value={deadline?.toDate().toLocaleString()}
        size="sm"
        borderRadius="15"
        borderWidth="3"
        borderColor="highlight"
        _focusVisible={{ borderWidth: '3px', borderColor: 'secondarytext' }}
        bg="background"
        color="secondarytext"
      />
      <Input
        placeholder="Description..."
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        value={description}
        size="sm"
        borderRadius="15"
        borderWidth="3"
        borderColor="highlight"
        _focusVisible={{ borderWidth: '3px', borderColor: 'secondarytext' }}
        bg="background"
        color="secondarytext"
      />
      <Heading fontSize={20}>Choose the level of importance</Heading>
      <RadioGroup
        onChange={(value) => {
          setImportance(Number(value));
        }}
        size="sm"
        value={`${importance}`}
      >
        <Stack direction="row">
          <Radio value="1">Low</Radio>
          <Radio value="2">Medium</Radio>
          <Radio value="3">High</Radio>
        </Stack>
      </RadioGroup>
      <HStack>
        <Button
          width="50%"
          size="sm"
          bg="secondarytext"
          _hover={{ bg: 'secondary', color: 'secondarytext' }}
          colorScheme="green"
          onClick={() => {
            onSubmit({ name, deadline, description, importance });
            setName('');
            setDeadline(null);
            setDescription('');
            setImportance(1);
          }}
        >
          {taskId ? 'Update' : 'Add'}
        </Button>

        {taskId ? (
          <Button size="sm" colorScheme="red" onClick={() => deleteTask(taskId)}>
            <DeleteIcon />
          </Button>
        ) : (
          <></>
        )}
      </HStack>
    </Stack>
  );
}
