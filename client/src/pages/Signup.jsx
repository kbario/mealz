import { useState } from "react";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { Flex, Heading, Text, Button, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

function Signup() {

    const [addProfile, { error, data }] = useMutation(ADD_USER)
    const [pageInView, setPageInView] = useState('login');
    const [emailError, setEmailError] = useState(false)
    const [email, setEmail] = useState('')

    return (
        <Flex h="100%" w="100%" direction="column" p="5" align="center" justify="center" gap="10">
           {pageInView === 'login' && <Box>
               <Heading>login</Heading>
               <Button onClick={() => setPageInView('signup')}>Click Me</Button>
            </Box>}
           {pageInView === 'signup' && <Box>
               <Heading>signup</Heading>
               <FormControl isInvalid={emailError}>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        id='email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <FormErrorMessage>Email is required.</FormErrorMessage>} 
        {/*<FormHelperText>
          Enter the email you'd like to receive the newsletter on.
      </FormHelperText>*/}
    </FormControl>
               <Button onClick={() => setPageInView('login')}>Click Me</Button>
               <Button onClick={() => setPageInView('login')}>Click Me</Button>
            </Box>}
        </Flex>
    )
}

export default Signup;