import { Timestamp } from 'firebase/firestore/lite';

export interface Task {
  name: string;
  description: string;
  importance: number;
  deadline: Timestamp;
  active: boolean;
  status: boolean;
  uuid: string;
}
