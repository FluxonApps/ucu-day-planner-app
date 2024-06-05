import { getAuth } from 'firebase/auth';

import { Query, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Task } from '../models/Task';

import { db } from '../../firebase.config';
import { useMemo } from 'react';

const auth = getAuth();

export function useFetchTaskList() {
  const [user] = useAuthState(auth);

  const tasksCollectionRef = collection(db, 'tasks');

  const userTasksCollectionQuery = user && query(tasksCollectionRef, where('userId', '==', user.uid));

  const [tasksSnapshot] = useCollection(userTasksCollectionQuery as Query<Task>);

  var tasksList = useMemo(
    () =>
      tasksSnapshot?.docs?.map((taskDoc) => {
        const task = taskDoc.data();
        task.id = taskDoc.id;

        return task;
      }),
    [tasksSnapshot],
  );
  tasksList?.sort((a, b) => b.importance - a.importance);

  return tasksList;
}
