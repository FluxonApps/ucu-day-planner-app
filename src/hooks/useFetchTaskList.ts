import { getAuth } from 'firebase/auth';

import { Query, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Task } from '../models/Task';

import { db } from '../../firebase.config';
import { useMemo } from 'react';
import { FirestoreError } from 'firebase/firestore';

const auth = getAuth();

export function useFetchTaskList(): [Array<Task> | undefined, boolean, FirestoreError | undefined] {
  const [user] = useAuthState(auth);

  const tasksCollectionRef = collection(db, 'tasks');

  const userTasksCollectionQuery = user && query(tasksCollectionRef, where('userId', '==', user.uid));

  const [tasksSnapshot, loading, error] = useCollection(userTasksCollectionQuery as Query<Task>);

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
  tasksList?.sort((a, b) => +b.status - +a.status);

  return [tasksList, loading, error];
}
