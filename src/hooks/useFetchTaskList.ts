import { getAuth } from 'firebase/auth';
import { Query, addDoc, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Task } from '../models/Task';

import { db } from '../../firebase.config';

const auth = getAuth();

export function useFetchTaskList() {
  const [user] = useAuthState(auth);
  const tasksCollectionRef = collection(db, 'tasks');
  const userTasksCollectionQuery = user && query(tasksCollectionRef, where('uuid', '==', user.uid));

  const [tasksSnapshot] = useCollection(userTasksCollectionQuery as Query<Task>);

  var tasksList = tasksSnapshot?.docs?.map((taskDoc) => {
    const task = taskDoc.data();

    return task;
  });
  tasksList?.sort((a, b) => b.importance - a.importance);

  return tasksList;
}
