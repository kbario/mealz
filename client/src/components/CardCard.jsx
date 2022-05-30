import {
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  CloseButton,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { REMOVE_CARD } from '../utils/mutations';

export function CardCard({ card }) {
  const [removeCard, { loading, error }] = useMutation(REMOVE_CARD);
  console.log(card);
  return (
    <Flex p="2" direction="column" rounded="md" boxShadow="md">
      <Flex justify="space-between" align="center">
        <Heading variant="cardcardHeading">{card.name}</Heading>
        <CloseButton
          onClick={async () => {
            await removeCard({ variables: { _id: card._id } });
            window.location.reload();
          }}
        />
      </Flex>
      <UnorderedList>
        {card.meals.map((meal, idx) => {
          return <ListItem key={idx}>{meal.name}</ListItem>;
        })}
      </UnorderedList>
    </Flex>
  );
}

export default CardCard;
