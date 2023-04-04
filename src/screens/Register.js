import React, { useState } from "react";
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

const Register = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClickConfirm = () => setConfirmShow(!confirmShow);

    const handleSetState = (value, fieldName) => {
        data[fieldName] = value;
        setData({
            ...data
        });
    }

    const handleRegister = () => {
        console.log('Call api here');
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
                <Text fontWeight={'bold'} fontSize='4xl'>Register</Text>

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
                        focusBorderColor='#33998B' s
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

                <HStack mt={4} alignItems={'flex-start'} w={'100%'}>
                    <Text >Confirm Password</Text>
                </HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AiFillLock color='gray.300' />}
                    />
                    <Input
                        value={data.confirmPassword}
                        type={confirmShow ? 'text' : 'password'}
                        focusBorderColor='#33998B' variant='flushed'
                        placeholder='Confirm Password'
                        onChange={(e) => handleSetState(e.target.value, 'confirmPassword')}

                    />
                    <InputRightElement ml={2}>
                        <IconButton
                            onClick={handleClickConfirm}
                            variant={'unstyled'}
                            colorScheme='teal'
                            aria-label='Call Segun'
                            icon={confirmShow ? <AiOutlineEye color="black" /> : <AiOutlineEyeInvisible color="black" />}
                        />
                    </InputRightElement>
                </InputGroup>

                <Button onClick={handleRegister} color={'white'} bgGradient='linear(to-r, teal.500, green.500)' w={'100%'} mt={8} borderRadius={30}>
                    Register
                </Button>
            </Flex>
        </Flex >
    );
}

export default Register;