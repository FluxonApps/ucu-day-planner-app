import { Timestamp } from 'firebase/firestore';

export interface Task {
  name: string;
  description: string;
  importance: number;
  deadline: Timestamp;
  active: boolean;
  status: boolean;
  uuid: string;
}
