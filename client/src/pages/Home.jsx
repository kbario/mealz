import NavHeader from "../components/NavHeader"
import { Flex, Heading, Text, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

function Home() {
    return (
      <>
        <Flex h="70vh" direction="column" p="5" align={"center"} justify="center" gap="10">
          <Heading align={"center"}>An Effortless Professional Github Portfolio</Heading>
          <Text align={"center"}>create a customised dashboard of your github repos to humble brag and let work find you.</Text>
          <Link to="/dashboard"><Button variant="fillBtn">Get Started</Button></Link>
        </Flex>
      </>
    )
}

export default Home