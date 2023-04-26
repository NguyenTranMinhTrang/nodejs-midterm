import React, { useState, useEffect } from "react";
import {
    Flex,
    Text,
    HStack,
    Box,
    Circle,
    Image,
    IconButton,
    Icon,
    Button
} from '@chakra-ui/react';
import { AiFillInstagram, AiFillHome, AiOutlineUsergroupDelete, AiFillBell, AiOutlineSmallDash, AiOutlineLogout } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import utils from "../utils";
import { toast } from "react-toastify";
import services from "../services";
import ListChat from "../components/ListChat";
import ChatBox from "../components/ChatBox";

const Home = () => {
    const user = utils.getDataFromLocal('user');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        toast.success('Log out success !');
        navigate("/login");
    }

    const renderMenu = () => {
        return (
            <Box
                w={'8%'}
                bg={'#262626'}
                borderTopLeftRadius={30}
                borderBottomLeftRadius={30}
                padding={4}
            >
                <Flex
                    w={'100%'}
                    h={'100%'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Circle size='60px' bg='tomato' color='white' mb={20}>
                        <Image
                            borderRadius='full'
                            objectFit='cover'
                            src={user?.avatar}
                            alt='Dan Abramov'
                        />
                    </Circle>
                    <IconButton
                        mt={4}
                        variant={'unstyled'}
                        fontSize='30px'
                        color={'white'}
                        icon={<AiFillHome />}
                    />

                    <IconButton
                        mt={4}
                        variant={'unstyled'}
                        fontSize='30px'
                        color={'#676767'}
                        icon={<AiOutlineUsergroupDelete />}
                    />

                    <IconButton
                        mt={4}
                        variant={'unstyled'}
                        fontSize='30px'
                        color={'#676767'}
                        icon={<AiFillBell />}
                    />

                    <IconButton
                        mt={4}
                        variant={'unstyled'}
                        fontSize='30px'
                        color={'#676767'}
                        icon={<AiOutlineSmallDash />}
                    />
                    <Button onClick={handleLogout} mt={20} padding={2} fontSize={16} rightIcon={<AiOutlineLogout />} colorScheme='whiteAlpha' variant='outline'>
                        Log out
                    </Button>
                </Flex>
            </Box>
        );
    }

    const renderDetailUser = () => {
        return (
            <Flex
                w={'22%'}
                borderTopRightRadius={30}
                borderBottomRightRadius={30}
                flexDirection={'column'}
                alignItems={'center'}
                p={4}
            >
                <Image
                    mt={50}
                    borderRadius='full'
                    objectFit='cover'
                    src={user?.avatar}
                    alt='Dan Abramov'
                    boxSize='180px'
                />
                <Text mt={2} mb={2} fontWeight={'bold'}>{user?.name}</Text>
                <Text mb={2}>Email: {user?.email}</Text>
                <Text mb={2}>so it can be necessary to </Text>
                <HStack>
                    <Icon as={FaFacebook} boxSize={9} />
                    <Icon as={AiFillInstagram} boxSize={10} />
                </HStack>
            </Flex>
        );
    }

    return (
        <Box h='100vh' bg={'#F4F7FF'} padding={8}>
            <Flex
                w={'100%'}
                h={'100%'}
                flexDirection={'row'}
                bg={'white'}
                borderRadius={30}
            >
                {renderMenu()}
                <ListChat />
                <ChatBox />
                {renderDetailUser()}
            </Flex>
        </Box>
    )
};

export default Home;