import { Flex, Heading, ListItem, UnorderedList } from '@chakra-ui/react';

export function CardCard({ card }) {
  return (
    <Flex p="2" direction="column" rounded="md" boxShadow="md">
      <Heading variant="cardcardHeading">{card.name}</Heading>
      <UnorderedList>
        {card.meals.map((meal, idx) => {
          return <ListItem key={idx}>{meal.name}</ListItem>;
        })}
      </UnorderedList>
    </Flex>
  );
}

export default CardCard;
