import { Button, Heading, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';

export interface TaskFormData {
  name: string;
  deadline: Timestamp | null;
  description: string;
  importance: number;
}

interface ITaskForm {
  defaultValues?: TaskFormData;
  onSubmit: (newTask: TaskFormData) => void;
  isUpdate: boolean;
}

export function TaskForm({ onSubmit, defaultValues, isUpdate }: ITaskForm) {
  const [name, setName] = useState(defaultValues?.name ?? '');
  const [deadline, setDeadline] = useState<Timestamp | null>(defaultValues?.deadline ?? null);
  const [description, setDescription] = useState(defaultValues?.description ?? '');
  const [importance, setImportance] = useState(defaultValues?.importance ?? 1);

  return (
    <Stack spacing="3">
      <Input
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
        placeholder="Name of Task..."
        size="sm"
      />
      <Input
        type="datetime-local"
        onChange={(event) => {
          const date = new Date(event.target.value);
          const timestamp = Timestamp.fromDate(date);
          setDeadline(timestamp);
        }}
        value={deadline?.toDate().toLocaleString()}
        size="sm"
      />
      <Input
        placeholder="Description..."
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        value={description}
        size="sm"
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
      <Button
        width="50%"
        size="sm"
        colorScheme="green"
        onClick={() => {
          onSubmit({ name, deadline, description, importance });
          setName('');
          setDeadline(null);
          setDescription('');
          setImportance(1);
        }}
      >
        {isUpdate ? 'Update' : 'Add'}
      </Button>
    </Stack>
  );
}
