import {
  Flex,
  useMediaQuery,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { fancyDay } from '../utils/dates';

import PlanModal from '../components/PlanModal';
import NavHeader from '../components/NavHeader';
import CardCard from '../components/CardCard';

import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';

function Plan() {
  const { data, loading, error } = useQuery(QUERY_ME);
  const [isNotPhone] = useMediaQuery('(min-width: 500px)');

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  const { recipes, cards } = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

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

  const myArr = [0, 1, 2, 3, 4];

  return (
    <Flex h="full" w="full" direction="column">
      <NavHeader page={'plan'} me={data?.me} />
      <Flex grow={1} w="full" direction="column" p="6" gap="6">
        <Tabs
          isFitted
          boxShadow="md"
          rounded="md"
          w="full"
          h="full"
          defaultIndex={1}
          display="flex"
          flexDirection="column"
        >
          <TabList>
            <Tab>last</Tab>
            <Tab>this</Tab>
            <Tab>next</Tab>
            <Tab>next</Tab>
            <Tab>next</Tab>
          </TabList>

          <TabPanels display="flex" flexGrow={1}>
            {myArr.map(index => (
              <TabPanel key={index} display="flex" flexGrow={1}>
                <Flex
                  display="flex"
                  direction={isNotPhone ? 'row' : 'column'}
                  flexGrow={1}
                >
                  {dates
                    .filter((date, idx) => {
                      return [
                        0 + 7 * index,
                        1 + 7 * index,
                        2 + 7 * index,
                        3 + 7 * index,
                        4 + 7 * index,
                        5 + 7 * index,
                        6 + 7 * index,
                      ].includes(idx);
                    })
                    .map((date, idx) => {
                      return (
                        <Flex
                          direction={isNotPhone ? 'column' : 'row'}
                          w={isNotPhone ? '100%' : '1/7'}
                          h={isNotPhone ? '1/7' : '100%'}
                          flexGrow={1}
                          position="relative"
                          px={isNotPhone ? '2' : '0'}
                          py={!isNotPhone ? '2' : '0'}
                          borderLeft={idx !== 0 && isNotPhone ? '1px' : '0px'}
                          borderTop={idx !== 0 && !isNotPhone ? '1px' : '0px'}
                          key={idx}
                        >
                          <Box>
                            {date.fancy}
                            <br />
                            {date.numbers}
                          </Box>
                          {cards
                            .filter(card => card.date === date.numbers)
                            .map((card, idx) => {
                              return <CardCard card={card} key={idx} />;
                            })}

                          <PlanModal
                            date={date.numbers}
                            day={date.fancy}
                            recipes={recipes}
                            isPhone={!isNotPhone}
                          />
                        </Flex>
                      );
                    })}
                </Flex>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

export default Plan;
