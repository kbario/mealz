import {
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Spacer,
  Text,
  Image,
  GridItem,
  Link,
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
        <Heading variant="RecipeCard">{name.toLowerCase()}</Heading>
        <Flex w="100%" gap="2" wrap="wrap">
          <Tag boxShadow="md">
            <TagLeftIcon boxSize="5">{people}</TagLeftIcon>
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
        <Text flexGrow="1">{description}</Text>
        {from && /http/.test(from) ? (
          <Text>
            credit:{' '}
            <Link href={from} target="_blank">
              {from}
            </Link>
          </Text>
        ) : (
          <Text>credit: {from}</Text>
        )}
      </Flex>
    </GridItem>
  );
}

export default RecipeCard;
