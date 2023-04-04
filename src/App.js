import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
