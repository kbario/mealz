import { useMutation } from '@apollo/client';
import {
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  GridItem,
  Link,
  CloseButton,
} from '@chakra-ui/react';
import { globe, People, clock, bag } from '../icons/icons';
import { REMOVE_RECIPE } from '../utils/mutations';

function RecipeCard({ recipe }) {
  const [removeRecipe] = useMutation(REMOVE_RECIPE);
  const {
    _id,
    name,
    cuisine,
    from,
    serves,
    cookTime,
    numberOfIngredients,
    description,
  } = recipe;

  return (
    <GridItem>
      <Flex
        key={_id}
        w="100%"
        h="64"
        boxShadow="md"
        borderRadius="sm"
        direction="column"
        p="3"
        gap="3"
      >
        <Flex justify="space-between" align="center">
          <Heading variant="RecipeCard">{name.toLowerCase()}</Heading>
          <CloseButton
            onClick={async () => {
              await removeRecipe({ variables: { _id: _id } });
              window.location.reload();
            }}
          />
        </Flex>
        <Flex w="100%" gap="1" wrap="wrap">
          <Tag boxShadow="md">
            <TagLeftIcon boxSize="5" as={People} />
            <TagLabel>{serves}</TagLabel>
          </Tag>
          {cuisine && (
            <Tag boxShadow="md">
              <TagLeftIcon boxSize="5">{globe}</TagLeftIcon>
              <TagLabel>{cuisine.toUpperCase()}</TagLabel>
            </Tag>
          )}
          {cookTime && (
            <Tag boxShadow="md">
              <TagLeftIcon boxSize="5">{clock}</TagLeftIcon>
              <TagLabel>{cookTime}</TagLabel>
            </Tag>
          )}
          <Tag boxShadow="md">
            <TagLeftIcon boxSize="5">{bag}</TagLeftIcon>
            <TagLabel>{numberOfIngredients}</TagLabel>
          </Tag>
        </Flex>
        <Text flexGrow="1" overflow={'hidden'}>
          {description}
        </Text>
        {from && (
          <Text>
            credit:{' '}
            {/http/.test(from) ? (
              <Link href={from} target="_blank">
                Online
              </Link>
            ) : (
              from
            )}
          </Text>
        )}
      </Flex>
    </GridItem>
  );
}

export default RecipeCard;
