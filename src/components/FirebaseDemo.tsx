import { Box, Button, Flex, Heading, Input, Checkbox, HStack, Spinner, Spacer} from '@chakra-ui/react';
import { collection, addDoc, deleteDoc, doc, query, CollectionReference } from 'firebase/firestore';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase.config';

interface User {
  id: string;
  name: string;
  mark: number;
}
export function FirebaseDemo() {
  const [newName, setNewName] = useState('');
  const [newMark, setNewMark] = useState(0);

  const usersCollectionRef = collection(db, 'users');

  const [users, usersLoading, usersError] = useCollection(query(usersCollectionRef) as CollectionReference<User>);
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, mark: Number(newMark) });
  };

  // const updateUser = async (id: string, mark: number) => {
  //   const userDoc = doc(db, 'users', id);
  //   const newFields = { mark: mark + 1 };
  //   await updateDoc(userDoc, newFields);
  // };

  const deleteUser = async (id: string) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  if (usersLoading) {
    return <Spinner />;
  }

  if (usersError) {
    return <Box>Error fetching users</Box>;
  }

  return (
    <Flex flexDir="column" gap="8" padding="6">
      <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="30%" px="6" py="8">
        <HStack spacing="3">
          <Input
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            placeholder="Task"
            size="sm"
          />
          <Input
            type="number"
            placeholder="Priority"
            onChange={(event) => {
              setNewMark(Number(event.target.value));
            }}
            size="sm"
          />
        </HStack>
        <Button width="30%" size="sm" colorScheme="green" onClick={createUser}>
          Create Task
        </Button>
      </Flex>
      <Flex gap="4" flexWrap="wrap">
        {users &&
          users.docs.map((user) => (
            <Box  gap="6" border="1px" borderColor="gray.300" width="15%"  key={user.id}>
              <HStack py= '1' gap="2">
                {/* <Button size="sm" colorScheme="green" onClick={() => updateUser(user.id, user.data().mark)}>
                  Increase Mark
                </Button> */}

                <Spacer></Spacer>
                <Button bgColor = 'white' size = 'xs' fontSize={'2xl'}>
                ✎
                </Button>

                <Button size='xs' bgColor='white' textColor='red'  onClick={() => deleteUser(user.id)}>
                  x
                </Button>
              </HStack>
              <Heading margin={4} fontSize='2xl'>Task: {user.data().name}</Heading>
              <Heading margin={4} fontSize='2xl'>Priority {user.data().mark}</Heading>
              <Flex>
                <Spacer></Spacer>
                <Checkbox py={2} px={2} border = {2}></Checkbox>
              </Flex>
              {/* <Heading>Bool: {user.data().imfo ? user.data().imfo : "True"}</Heading> */}
              {/* <HStack gap="4" mt="4">
                <Button size="sm" colorScheme="green" onClick={() => updateUser(user.id, user.data().mark)}>
                  Increase Mark
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => deleteUser(user.id)}>
                  Delete User
                </Button>
              </HStack> */}
            </Box>
          ))}
      </Flex>
    </Flex>
  );
}
export default FirebaseDemo;
