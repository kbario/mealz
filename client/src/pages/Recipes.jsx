import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Navigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import RecipeCard from "../components/RecipeCard"
import NavHeader from "../components/NavHeader"

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

function Recipes() {
  const { data, loading, error } = useQuery(QUERY_ME);
  
  if (!Auth.loggedIn()) {
      return <Navigate to="/signup" />;
    }
    
  const {name, recipes} = data?.me || {}
  if (loading) {return <div>Loading...</div>}
  if (error) {return <div>Error {error.message}</div>}

  return (
    <Flex w="100%" h="100%" direction="column">
      <NavHeader me={data?.me}/>
      <Flex
        h="grow"
        w="100%"
        direction="column"
        p="5"
        align="center"
        justify="center"
        gap="10"
      >
          hi {name}
          {recipes!==null ? recipes.map(recipe => {
              return <RecipeCard recipe={recipe}/>
          }): "you have no recipes"}
      </Flex>
    </Flex>
  );
}

export default Recipes;
