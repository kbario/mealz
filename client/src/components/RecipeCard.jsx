import {
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { globe, people, clock, bag } from '../icons/icons';

function RecipeCard({ recipe }) {
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
    <Flex
      key={_id}
      w="100%"
      h="40"
      boxShadow="md"
      borderRadius="sm"
      direction="column"
      p="3"
      gap="3"
    >
      <Heading>{name.toLowerCase()}</Heading>
      <Flex w="100%">
        <Tag>
          <TagLeftIcon boxSize="5">{globe}</TagLeftIcon>
          <TagLabel>{cuisine.toUpperCase()}</TagLabel>
        </Tag>
        <Tag>
          <TagLeftIcon boxSize="5">{people}</TagLeftIcon>
          <TagLabel>{serves}</TagLabel>
        </Tag>
        <Tag>
          <TagLeftIcon boxSize="5">{clock}</TagLeftIcon>
          <TagLabel>{cookTime}</TagLabel>
        </Tag>
        <Tag>
          <TagLeftIcon boxSize="5">{bag}</TagLeftIcon>
          <TagLabel>{numberOfIngredients}</TagLabel>
        </Tag>
      </Flex>
      <Text>{description}</Text>
    </Flex>
  );
}

export default RecipeCard;
