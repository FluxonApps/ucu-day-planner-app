import { Box, Button, SimpleGrid, Center, Checkbox } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { Query, addDoc, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase.config';

// import MainLayout from './layout/MainLayout.tsx';

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
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
        {scootersSnapshot?.docs.map((scooterDoc) => {
            const scooter = scooterDoc.data();

            return (
            <Center key={scooterDoc.id}>
                <br />
                <Box bg='green' p={0.5} color='white' alignItems='center'  borderRadius='md' boxShadow='md'>
                <Box as='button' bg='white' w='100%' p={20} color='gray'  borderRadius='md' boxShadow='md'>
                    {scooter.color}
                
                    <Checkbox defaultChecked colorScheme='cyan'></Checkbox>
                </Box>
                </Box>
            </Center>
            );
        })}
      </SimpleGrid>
    </>
  );
}