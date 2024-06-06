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
  onSubmit: (newTask: TaskFormData) => void;
}

export function TaskForm({ onSubmit }: ITaskForm) {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState<Timestamp | null>(null);
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState(1);

  return (
    <Stack spacing="3">
      <Input
        onChange={(event) => {
          setName(event.target.value);
        }}
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
        size="sm"
      />
      <Input
        placeholder="Description..."
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        size="sm"
      />
      <Heading fontSize={20}>Choose the level of importance</Heading>
      <RadioGroup
        onChange={(value) => {
          setImportance(Number(value));
        }}
        size="sm"
        defaultValue="1"
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
        }}
      >
        Create Task
      </Button>
    </Stack>
  );
}
