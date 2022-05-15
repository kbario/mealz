import React from 'react';
import {
  ChakraProvider,
  // Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  // Grid,
  // theme,
  extendTheme
} from '@chakra-ui/react';
import { Router, Routes, Route } from "react-router-dom"
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Home from "./pages/Home"

const config = {
  useSystemColourMode: true
}

const colors = {
  brand: {
    dark: '#27272A',
    blue: '#0369A1',
    orange: '#FED7AA',
    light: '#F4F4F5',
  },
}

const theme = extendTheme({ config, colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>  
          <Route 
            path="/" 
            element={<Home />} 
          />
          {/* <Route 
            path="/profiles/:profileId" 
            element={<Profile />} 
          /> */}
        </Routes>
      </Router>
    </ChakraProvider>
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