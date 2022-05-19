import RepoCard from "../components/RepoCard";
import { Flex, Heading, Text, Button } from "@chakra-ui/react"
import { Navigate, Link } from 'react-router-dom';

import Auth from '../utils/auth';

function Home() {

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }


    return (
      <>
        <Flex h="100%" w="100%" direction="column" p="5" align="center" justify="center" gap="10">
          <RepoCard></RepoCard>
        </Flex>
      </>
    )
}

export default Home