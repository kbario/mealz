import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Flex, Heading } from '@chakra-ui/react';

import RecipeCard from '../components/RecipeCard';
import NavHeader from '../components/NavHeader';
import RecipeModal from '../components/RecipeModal';

import { QUERY_ME } from '../utils/queries';

import { randomIngreeds } from '../utils/randomIngreeds';

import Auth from '../utils/auth';

function Recipes() {
  const { data, loading, error } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  const { recipes } = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <Flex w="100%" h="100%" direction="column">
      <NavHeader me={data?.me} />
      <Heading variant="lightHeading" paddingLeft="6">
        recipes
      </Heading>
      <Flex
        h="grow"
        w="100%"
        direction="column"
        p="6"
        align="center"
        justify="center"
        gap="10"
      >
        {recipes !== null
          ? recipes.map(recipe => {
              return <RecipeCard recipe={recipe} key={recipe._id} />;
            })
          : 'you have no recipes'}
      </Flex>
      <RecipeModal rand={randomIngreeds[Math.round(Math.random() * 8)]} />
    </Flex>
  );
}

export default Recipes;
