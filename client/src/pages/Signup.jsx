import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import {
  Flex,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import NavHeader from '../components/NavHeader';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [addUser, { userLoading, userError }] = useMutation(ADD_USER);
  const [login, { loginLoading, loginError }] = useMutation(LOGIN_USER);
  const [pageInView, setPageInView] = useState('login');
  const [nameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError] = useState(false);
  const [passwordConfirmError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    setPageInView(localStorage.getItem('hereBefore') ? 'login' : 'signup');
  }, []);

  const updateEmailOnFly = e => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleSignup = async e => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { name, email, password },
      });

      Auth.login(data.addUser.token);
      localStorage.setItem('hereBefore', true);
      <Navigate to="/home" />;
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogin = async e => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      localStorage.setItem('hereBefore', true);
      Auth.login(data.login.token);
      <Navigate to="/home" />;
    } catch (err) {
      console.error(err);
    }
  };
  if (Auth.loggedIn()) {
    return <Navigate to="/home" />;
  }

  if (loginLoading || userLoading) {
    return (
      <Flex w="100%" h="100%" align="left" justify="center">
        <Heading>Loading...</Heading>
      </Flex>
    );
  }
  if (loginError || userError) {
    return (
      <Flex w="100%" h="100%" align="left" justify="center" direction="column">
        <NavHeader />
        <Heading>Error</Heading>
        <Text>name: {loginError.name || userError.name}</Text>
        <Text>message: {loginError.message || userError.message}</Text>
      </Flex>
    );
  }

  return (
    <Flex h="100%" w="100%" direction="column">
      <NavHeader />

      <Flex
        grow={1}
        w="100%"
        direction="column"
        p="5"
        align="center"
        justify="center"
        gap="10"
      >
        {pageInView === 'login' && (
          <>
            <Flex direction="column" gap="5">
              <Heading>login</Heading>
              <FormControl isInvalid={emailError} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={e => updateEmailOnFly(e)}
                  onMouseLeave={() =>
                    setEmailError(
                      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                        email
                      )
                    )
                  }
                />
                {emailError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={passwordError} isRequired>
                <FormLabel htmlFor="password-input">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordError && <FormErrorMessage></FormErrorMessage>}
              </FormControl>

              <Button onClick={e => handleLogin(e)}>Login</Button>
            </Flex>
          </>
        )}
        {pageInView === 'signup' && (
          <Flex direction="column" gap="5">
            <Heading>signup</Heading>
            <FormControl isInvalid={nameError} isRequired>
              <FormLabel htmlFor="email">Name</FormLabel>
              <Input
                id="name-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {nameError && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={emailError} isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => updateEmailOnFly(e)}
                onMouseLeave={() =>
                  setEmailError(
                    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                      email
                    )
                  )
                }
              />
              {emailError && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError} isRequired>
              <FormLabel htmlFor="password-input">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordError && <FormErrorMessage></FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={passwordConfirmError} isRequired>
              <FormLabel htmlFor="password-confirm-input">
                Password Confirm
              </FormLabel>
              <InputGroup>
                <Input
                  id="password-confirm-input"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPasswordConfirm(!showPassword)}
                  >
                    {showPasswordConfirm ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordConfirmError ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : (
                <FormHelperText>
                  password must contain atleast one upper- and lowercase
                  letters, number, and punctuation symbols
                </FormHelperText>
              )}
            </FormControl>
            <Button onClick={e => handleSignup(e)}>signup</Button>

            <Button onClick={() => setPageInView('login')}>login</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Signup;

// {/*<FormHelperText>
//           Enter the email you'd like to receive the newsletter on.
//       </FormHelperText>*/}
