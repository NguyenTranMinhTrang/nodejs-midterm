import React, { useEffect, useState } from "react";
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
import { AiOutlineMail, AiFillLock, AiOutlineEyeInvisible, AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { toast } from 'react-toastify';
import axios from "axios";
import axiosInstance from '../config/axios';
import constants from "../constants";
import _ from "lodash";
import utils from "../utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '',
    });
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => setShow(!show);
    const handleClickConfirm = () => setConfirmShow(!confirmShow);

    useEffect(() => {
        const user = utils.getDataFromLocal('user');
        console.log('user: ', user);
        if (user) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSetState = (value, fieldName) => {
        data[fieldName] = value;
        setData({
            ...data
        });
    }

    const handleRegister = async () => {
        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            toast.error('Field can not be empty !');
        } else if (data.password !== data.confirmPassword) {
            toast.error('Confirm password is incorrect !');
        } else {
            const dataPost = _.omit(data, 'confirmPassword');
            setLoading(true);
            if (file) {
                if (file.type === "image/jpeg" || file.type === "image/png") {
                    const dataUpload = new FormData();
                    dataUpload.append("file", file);
                    dataUpload.append("upload_preset", "chat-app");
                    dataUpload.append("cloud_name", "dllqfdww7");
                    try {
                        const response = await axios.post('https://api.cloudinary.com/v1_1/dllqfdww7/image/upload', dataUpload);
                        if (response && response.status === 200) {
                            const url = response.data.url;
                            dataPost['avatar'] = url;
                        } else {
                            toast.error('Upload image fail !');
                        }
                    } catch (error) {
                        console.log('Upload image: ', error);
                        toast.error('Upload image fail !');
                    }
                }
            }
            try {
                const response = await axiosInstance.post(constants.REGISTER, dataPost);
                console.log('response: ', response);
                if (response.data.success) {
                    utils.saveToLocal('user', response.data.result);
                    setLoading(false);
                    toast.success('Register success !');
                    navigate("/");
                }
            } catch (error) {
                console.log('Register: ', error);
                toast.error('Request timeout! Please try again.');
            }
            setLoading(false);
            return;
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
                <Text fontWeight={'bold'} fontSize='4xl'>Register</Text>

                <HStack mt={4} alignItems={'flex-start'} w={'100%'}>
                    <Text>Name</Text>
                </HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input
                        value={data.name}
                        focusBorderColor='#33998B'
                        variant='flushed'
                        placeholder='Name'
                        onChange={(e) => handleSetState(e.target.value, 'name')}
                    />
                </InputGroup>
                <HStack mt={4} alignItems={'flex-start'} w={'100%'}>
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


                <HStack mt={4} alignItems={'flex-start'} w={'100%'}>
                    <Text >Upload your avatar</Text>
                </HStack>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineUser color='gray.300' />}
                    />
                    <Input
                        type="file"
                        variant='flushed'
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </InputGroup>

                <Button
                    onClick={handleRegister}
                    color={'white'}
                    bgGradient='linear(to-r, teal.500, green.500)'
                    w={'100%'} mt={8}
                    borderRadius={30}
                    isLoading={loading}
                >
                    Register
                </Button>
            </Flex>
        </Flex >
    );
}

export default Register;