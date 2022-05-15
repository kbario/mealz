import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Logo } from './Logo';
import Home from "./pages/Home"
import NavHeader from './components/NavHeader';
import { Box } from '@chakra-ui/react';


function App() {
  return (
      <Router>
        <Box w="100vw" h="100vh" bg="brand.light">
          <NavHeader />
          <Routes>  
            <Route 
              path="/" 
              element={<Home />} 
            />
          </Routes>
        </Box>
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