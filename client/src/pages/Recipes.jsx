import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Flex, Grid, useMediaQuery } from '@chakra-ui/react';

import RecipeCard from '../components/RecipeCard';
import NavHeader from '../components/NavHeader';
import RecipeModal from '../components/RecipeModal';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

function Recipes() {
  const { data, loading, error } = useQuery(QUERY_ME);
  const [isNotPhone] = useMediaQuery('(min-width: 500px)');
  const { recipes } = data?.me || {};

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <Flex w="100%" h="100%" direction="column">
      <NavHeader page={'recipes'} me={data?.me} />

      <Grid
        h="grow"
        templateColumns={[
          '1fr',
          'repeat(2,1fr)',
          'repeat(3,1fr)',
          'repeat(3,1fr)',
          'repeat(4,1fr)',
        ]}
        direction={isNotPhone ? 'row' : 'column'}
        p="6"
        paddingTop={0}
        gap="3"
        overflow="scroll"
      >
        {recipes !== null
          ? recipes.map((recipe, idx) => {
              return (
                <RecipeCard
                  recipe={recipe}
                  key={recipe._id}
                  isNotPhone={isNotPhone}
                />
              );
            })
          : 'you have no recipes'}
      </Grid>
      <RecipeModal
        rand={Math.round(Math.random() * 8)}
        isNotPhone={isNotPhone}
      />
    </Flex>
  );
}

export default Recipes;
