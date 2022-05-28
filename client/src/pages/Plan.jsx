import {
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { fancyDay } from '../utils/dates';
import { PlanButtons } from '../components/ButtonnModal';

import NavHeader from '../components/NavHeader';

import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';

function Plan() {
  const { data, loading, error } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  const { recipes } = data?.me || {};

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

  return (
    <Flex h="100%" w="100%" direction="column">
      <NavHeader me={data?.me} />
      <Flex grow={1} w="100%" direction="column" p="6" gap="3">
        <Heading>plan</Heading>
        <Flex rounded="sm" boxShadow="md" w="100%" h="100%">
          <TableContainer w="100%">
            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th w="160px">day</Th>
                  <Th>mealz</Th>
                </Tr>
              </Thead>
              {dates.map(date => (
                <Tbody key={date.uuu}>
                  <Tr>
                    <Td>
                      {date.fancy}
                      <br />
                      {date.numbers}
                    </Td>
                    <Td pos="relative">
                      <PlanButtons
                        date={date.numbers}
                        day={date.fancy}
                        recipes={recipes}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              ))}
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Plan;
