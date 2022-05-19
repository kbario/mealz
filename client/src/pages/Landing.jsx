import { Flex, Heading, Text, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

function Landing() {
    return (
      <>
        <Flex h="70vh" direction="column" p="5" align={"center"} justify="center" gap="10">
          <Heading align={"center"}>let's make meal time easy</Heading>
          <Text align={"center"}>save your favourite recipes, plan your meals in advance, and automatically make a shopping list</Text>
          <Link to="/home"><Button variant="fillBtn">Get Started</Button></Link>
        </Flex>
      </>
    )
}

export default Landing