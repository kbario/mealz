import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Logo } from './Logo';
import Landing from "./pages/Landing"
import NavHeader from './components/NavHeader';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Box, Flex } from '@chakra-ui/react';


function App() {
  return (
      <Router>
        <Flex w="100vw" h="100vh" bg="brand.light" direction={"column"}>
          <NavHeader />
          <Box flexGrow={1}>
            <Routes>  
              <Route 
                path="/" 
                element={<Landing />} 
              />
              <Route 
                path="/home" 
                element={<Home />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
            </Routes>
          </Box>
        </Flex>
      </Router>
  );
}

export default App;


{/* <Box textAlign="center" fontSize="xl">
<Grid minH="100vh" p={3}>
  <ColorModeSwitcher justifySelf="flex-end" />
  <VStack spacing={8}>
    <Logo h="40vmin" pointerEvents="none" />
    <Text>
      Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
    </Text>
    <Link
      color="teal.500"
      href="https://chakra-ui.com"
      fontSize="2xl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn Chakra
    </Link>
  </VStack>
</Grid>
</Box> */}