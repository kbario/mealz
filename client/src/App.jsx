import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Logo } from './Logo';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Plan from './pages/Plan';
import List from './pages/List';
import { Box, Flex } from '@chakra-ui/react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

// import { createClient } from 'pexels';
// const pexelClient = createClient(
//   '563492ad6f9170000100000107700a901a4b4d518b1da95c306b2930'
// );

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      accepts: 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <Flex
            w="100vw"
            h="100vh"
            bg="brand.light"
            direction={'column'}
            overflow="hidden"
          >
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </Flex>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;

{
  /* <Box textAlign="center" fontSize="xl">
<Grid minH="100vh" p={3}>
  <ColorModeSwitcher justifySelf="flex-end" />
  <VStack spacing={8}>
    <Logo h="40vmin" pointerEvents="none" />
    <Text>
      Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
    </Text>
    <Link
      color="teal.500"
      href="https://chakra-ui.com"
      fontSize="2xl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn Chakra
    </Link>
  </VStack>
</Grid>
</Box> */
}
