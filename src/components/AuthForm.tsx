import { Box, Button, Flex, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { db } from '../../firebase.config.ts';

const auth = getAuth();

const AuthForm = () => {
  const toast = useToast();

  const [user, isAuthLoading] = useAuthState(auth);
  const [signInWithEmailAndPassword, , signInLoading] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , signUpLoading] = useCreateUserWithEmailAndPassword(auth);
  const loading = signInLoading || signUpLoading;

  const [showSignIn, setShowSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchAuthMode = () => {
    setShowSignIn((prevState) => !prevState);
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      toast({ status: 'success', description: 'Successfully signed in!' });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Error',
        description: 'Failed to sign in. Please, try again.',
      });
    }
  };

  const signUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) throw new Error();

      // Save user to database.
      const userDocRef = doc(db, 'users', res.user.uid);
      await setDoc(userDocRef, { email });

      toast({ status: 'success', description: 'Successfully signed up!' });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Error',
        description: 'Failed to create a new user. Please, try again.',
      });
    }
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showSignIn) {
      await signIn();
    } else {
      await signUp();
    }
  };

  // Check if user is already signed in. If yes, redirect to main app.
  if (user && !isAuthLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box h="full" bg="highlight">
      <Flex w="full" h="full" alignItems="center" justifyContent="space-between">
        <Box
          bg="background"
          borderRadius="50"
          mx="auto"
          as="form"
          onSubmit={handleAuth}
          w={{
            base: '95%',
            sm: 480,
          }}
        >
          <Stack spacing={4} rounded="md" p={8}>
            <Text color="text" align="center" fontSize="2xl">
              {showSignIn ? 'Sign in' : 'Sign up'}
            </Text>
            <Input
              bg="white"
              borderRadius="15px"
              _focusVisible={{ borderWidth: '3px', borderColor: 'text' }}
              placeholder="Email"
              type="email"
              onChange={handleEmailChange}
              value={email}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
              bg="white"
              _focusVisible={{ borderWidth: '3px', borderColor: 'text' }}
              borderRadius="15px"
              value={password}
              minLength={6}
              required
            />
            <Button
              type="submit"
              bg="secondarytext"
              borderRadius="15px"
              color="background"
              _hover={{
                bg: 'background',
                color: 'secondarytext',
                border: '2px',
                borderColor: 'secondary',
                transform: 'scale(1.02)',
              }}
              isDisabled={loading}
              isLoading={loading}
            >
              {showSignIn ? 'Login' : 'Register'}
            </Button>
            <Button
              mt={4}
              fontSize="sm"
              fontWeight="normal"
              variant="link"
              onClick={switchAuthMode}
              isDisabled={loading}
              color="text"
            >
              {showSignIn ? 'Create a new account?' : 'Already have an account?'}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
