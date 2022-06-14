import {
  Flex,
  Text,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { fancyDay } from '../utils/dates';
import { useEffect, useState } from 'react';

import NavHeader from '../components/NavHeader';

import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';

function List() {
  const { data, loading, error } = useQuery(QUERY_ME);
  const [from, setFrom] = useState(7);
  const [to, setTo] = useState(14);
  const [filteredDates, setFilteredDates] = useState();
  let finalIngreeds;

  const dates = [...Array(35).keys()].map((item, idx) => {
    const d = new Date();
    const full = new Date(d.getFullYear(), d.getMonth(), d.getDate() + idx - 7);
    const fancy = fancyDay(full);
    const numbers = `${
      full.getDate().toString().length > 1 ? '' : 0
    }${full.getDate()}/${(full.getMonth() + 1).toString().length > 1 ? '' : 0}${
      full.getMonth() + 1
    }/${full.getFullYear().toString().slice(2)}`;
    const uuu = full.getTime();
    return { uuu, fancy, numbers };
  });

  useEffect(() => {
    setFilteredDates(dates.slice(from, to + 1));
  }, [from, to]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  if (data.me.cards && filteredDates) {
    const filteredCards = data.me.cards.filter(card => {
      const truth = filteredDates.map(date => date.numbers === card.date);
      return truth.includes(true);
    });

    const ingreeds = filteredCards.reduce((acc, idv, idx, arr) => {
      idv.meals.forEach((meal, midx) =>
        meal.ingredients.forEach(ingreed =>
          acc.push({
            ...ingreed,
            serves: meal.serves,
            serving: idv.serving[midx],
          })
        )
      );
      return acc;
    }, []);

    finalIngreeds = ingreeds.reduce((acc, idv, idx, arr) => {
      const exists = acc.map(acc => acc.name === `${idv.unit} ${idv.name}`);
      if (exists.includes(true)) {
        acc[exists.indexOf(true)].amount =
          acc[exists.indexOf(true)].amount +
          parseInt(idv.amount) * (parseInt(idv.serving) / parseInt(idv.serves));
      } else {
        acc.push({
          name: `${idv.unit} ${idv.name}`,
          amount:
            parseInt(idv.amount) *
            (parseInt(idv.serving) / parseInt(idv.serves)),
        });
      }
      return acc;
    }, []);
  }

  return (
    <Flex w="100%" h="100%" direction="column">
      <NavHeader page={'list'} me={data?.me} />
      <Flex direction="column" flexGrow="1" p="6">
        {!finalIngreeds && (
          <Text>You don't have any meals planned or ingreeds to buy :)</Text>
        )}
        {finalIngreeds && (
          <CheckboxGroup>
            {finalIngreeds.map((ingreeds, idx) => (
              <Checkbox key={idx} size="lg">
                <Text>
                  {ingreeds.amount} {ingreeds.name}
                </Text>
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      </Flex>
      <Flex gap="6" p="6" w={['100%', '100%', '75%']} mx="auto">
        <FormControl>
          <FormLabel htmlFor="recipeCuisine">from</FormLabel>
          <Select
            name="recipeFrom"
            value={from}
            onChange={e => {
              setFrom(parseInt(e.target.value));
            }}
          >
            {dates.map((date, idx) => {
              return (
                <option key={idx} value={idx} disabled={idx > to}>
                  {date.numbers} - {date.fancy}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="recipeFrom">to</FormLabel>
          <Select
            name="recipeFrom"
            value={to}
            onChange={e => {
              setTo(parseInt(e.target.value));
            }}
          >
            {dates.map((date, idx) => {
              return (
                <option key={idx} value={idx} disabled={idx < from}>
                  {date.numbers} - {date.fancy}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default List;
