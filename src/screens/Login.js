import React, { useState, useEffect } from "react";
import {
    InputRightElement,
    Button,
    Flex,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { AiOutlineMail, AiFillLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import constants from "../constants";
import utils from "../utils";
import axiosInstance from '../config/axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = utils.getDataFromLocal('user');
        console.log('user: ', user);
        if (user) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => setShow(!show);

    const handleSetState = (value, fieldName) => {
        data[fieldName] = value;
        setData({
            ...data
        });
    }

    const handleLogin = async () => {
        if (!data.email || !data.password) {
            toast.error('Field can not be empty !');
        } else {
            try {
                setLoading(true);
                console.log('come here: ', data);
                const response = await axiosInstance.post(constants.LOGIN, { data });
                console.log('come here: ', data);
                console.log('response: ', response);
                if (response?.success) {
                    utils.saveToLocal('user', response.data.result);
                    toast.success('Login success !');
                    navigate("/");
                } else {
                    toast.error(response?.error);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log('handleLogin: ', error);
                toast.error('Request timeout !');
            }
        }
    }

    return (
        <Flex h='100vh' bgGradient='linear(to-r, teal.500, green.500)' padding={8} justifyContent={'center'} alignItems={'center'}>
            <Flex
                w={'35%'}
                h={'100%'}
                flexDirection={'column'}
                bg={'white'}
                borderRadius={10}
                alignItems={'center'}
                p={8}
            >
                <Text fontWeight={'bold'} fontSize='4xl'>Login</Text>

                <HStack mt={8} alignItems={'flex-start'} w={'100%'}>
                    <Text >Email</Text>
                </HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input
                        value={data.email}
                        focusBorderColor='#33998B'
                        variant='flushed'
                        placeholder='Email'
                        onChange={(e) => handleSetState(e.target.value, 'email')}
                    />
                </InputGroup>

                <HStack mt={4} alignItems={'flex-start'} w={'100%'}>
                    <Text >Password</Text>
                </HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AiFillLock color='gray.300' />}
                    />
                    <Input
                        value={data.password}
                        type={show ? 'text' : 'password'}
                        focusBorderColor='#33998B'
                        variant='flushed'
                        placeholder='Password'
                        onChange={(e) => handleSetState(e.target.value, 'password')}
                    />
                    <InputRightElement ml={2}>
                        <IconButton
                            onClick={handleClick}
                            variant={'unstyled'}
                            colorScheme='teal'
                            aria-label='Call Segun'
                            icon={show ? <AiOutlineEye color="black" /> : <AiOutlineEyeInvisible color="black" />}
                        />
                    </InputRightElement>
                </InputGroup>

                <Button
                    onClick={handleLogin}
                    color={'white'}
                    bgGradient='linear(to-r, teal.500, green.500)'
                    w={'100%'} mt={8}
                    borderRadius={30}
                    isLoading={loading}
                >
                    Login
                </Button>
            </Flex>
        </Flex >
    );
}

export default Login;