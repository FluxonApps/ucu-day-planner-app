import { Task } from '../models/Task';
import { Box, Button } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { Query, addDoc, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase.config';

const auth = getAuth();
interface Scooter {
  id: string;
  userId: string;
  color: string;
}
const colors = ['green', 'black', 'white', 'red'];
export function UserRelationsDemo() {
  const [user] = useAuthState(auth);
  const scooterCollectionRef = collection(db, 'scooters');
  const userScooterCollectionQuery = user && query(scooterCollectionRef, where('userId', '==', user.uid));
  const createScooter = async () => {
    await addDoc(scooterCollectionRef, { userId: user?.uid, color: colors[Math.floor(Math.random() * colors.length)] });
  };

  const [scootersSnapshot] = useCollection(userScooterCollectionQuery as Query<Scooter>);

  return (
    <>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={() => {
          createScooter();
        }}
      >
        +
      </Button>
      {scootersSnapshot?.docs.map((scooterDoc) => {
        const scooter = scooterDoc.data();

        return (
          <div key={scooterDoc.id}>
            <Box>
              <br />
              {scooter.color}
            </Box>
          </div>
        );
      })}
    </>
  );
}

export function useFetchTaskList() {
  // Here goes the functionality of fetching tasks from Firestore.
  return [];
}
