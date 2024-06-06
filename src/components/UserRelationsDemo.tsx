import { Box, Button, SimpleGrid, Center, Checkbox } from '@chakra-ui/react';
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
      <Box paddingTop="48px"> {/* Adjust the value according to the height of your header */}
        <SimpleGrid columns={{base: 1, sm: 2, md: 3}} spacing={3} mx={{ base: 4, md: 20 }}>
          {scootersSnapshot?.docs.map((scooterDoc) => {
              const scooter = scooterDoc.data();

              return (
                <Center key={scooterDoc.id} py={2}>
                  <Box 
                    bg='green' 
                    color='white'
                    borderRadius='md'
                    boxShadow='md' 
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={0.5}
                  >
                    <Box 
                      bg='white' 
                      color='gray' 
                      borderRadius='md' 
                      boxShadow='md'
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      p={4}
                      textAlign="center"
                      height="100px" // Adjust the height to your preference
                    >
                      {scooter.color}
                      <Checkbox defaultChecked colorScheme='cyan' mt={2}></Checkbox>
                    </Box>
                  </Box>
                </Center>
              );
          })}
        </SimpleGrid>
      </Box>
      <Button
        size="lg"
        colorScheme="whiteAlpha"
        color = "black"
        position="fixed"
        bottom={8}
        right={8}
        width="80px"
        height="80px"
        borderRadius="100%"
        padding={0}
        margin={0}
        onClick={() => {
          createScooter();
        }}
      >
        +
      </Button>
    </>
  );
}
