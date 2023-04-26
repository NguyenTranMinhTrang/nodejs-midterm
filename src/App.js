import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ChatProvider from './context/ChatProvider';

function App() {
  return (
    <ChakraProvider>
      <ToastContainer
        position="top-right"
        autoClose={200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
