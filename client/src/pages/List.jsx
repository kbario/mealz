import {
  Flex,
  Heading,
  Text,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Navigate, Link } from 'react-router-dom';
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

  const { cards } = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  const filteredCards = cards.filter(card => {
    const truth = filteredDates.map(date => date.numbers === card.date);
    return truth.includes(true);
  });

  console.log(filteredCards);

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

  console.log(ingreeds);

  const finalIngreeds = ingreeds.reduce((acc, idv, idx, arr) => {
    const exists = acc.map(acc => acc.name === `${idv.unit} ${idv.name}`);
    if (exists.includes(true)) {
      const index = acc.reduce((accI, idvI, idxI, arrI) => {
        if (`${idvI.unit} ${idvI.name}` === `${idv.unit} ${idv.name}`)
          accI = idxI;
        return accI;
      }, '');
      acc[index].amount =
        acc.amount[index] +
        parseInt(idv.amount) * (parseInt(idv.serving) / parseInt(idv.serves));
    } else {
      acc.push({
        name: `${idv.unit} ${idv.name}`,
        amount:
          parseInt(idv.amount) * (parseInt(idv.serving) / parseInt(idv.serves)),
      });
    }
    return acc;
  }, []);

  console.log(finalIngreeds);

  return (
    <Flex w="100%" h="100%" direction="column">
      <NavHeader page={'list'} me={data?.me} />
      <Flex direction="column" flexGrow="1" p="6">
        <CheckboxGroup>
          {finalIngreeds.map(ingreeds => (
            <Checkbox size="lg">
              <Text>
                {ingreeds.amount} {ingreeds.name}
              </Text>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Flex>
      <Flex gap="5" p="6">
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
                <option value={idx} disabled={idx >= to}>
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
                <option value={idx} disabled={idx <= from}>
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
