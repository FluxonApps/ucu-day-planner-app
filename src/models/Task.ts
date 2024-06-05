import { Timestamp } from 'firebase/firestore';

export interface Task {
  name: string;
  description: string;
  importance: number;
  deadline: Timestamp;
  archived: boolean;
  status: boolean;
  userId: string;
  id: string;
}
