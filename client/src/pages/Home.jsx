import { Flex, Heading } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import NavHeader from '../components/NavHeader';

import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';

function Home() {
  const { data, loading, error } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  const { name } = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <Flex h="100%" w="100%" direction="column">
      <NavHeader me={data?.me} />
      <Flex
        grow={1}
        w="100%"
        direction="column"
        p="5"
        align="center"
        justify="center"
        gap="10"
      >
        <Heading>Welcome {name.split(' ')[0]}</Heading>
      </Flex>
    </Flex>
  );
}

export default Home;
