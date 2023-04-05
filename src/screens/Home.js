import React, { useState } from "react";
import {
    InputRightElement,
    VStack,
    Flex,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    Box,
    Circle,
    Image,
    IconButton,
    Icon
} from '@chakra-ui/react';
import { AiFillInstagram, AiOutlineSend, AiFillPhone, AiTwotoneVideoCamera, AiOutlinePlus, AiFillHome, AiOutlineUsergroupDelete, AiFillBell, AiOutlineSmallDash, AiOutlineSearch } from "react-icons/ai";
import MessageListItem from "../components/MessageListItem";
import GroupChatModal from "../components/GroupChatModal";
import Message from "../components/Message";
import { GrAttachment } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";


const Home = () => {

    console.log('Come here');

    const handleAddGroup = () => {

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
                            src='https://bit.ly/dan-abramov'
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
                </Flex>
            </Box>
        );
    }

    const renderUserList = () => {
        return (
            <Flex
                flexDirection={'column'}
                w={'30%'}
                borderRightWidth={1}
                borderRightColor={'#D1D2D5'}
            >
                {/* Search */}
                <VStack p={4} alignItems={'flex-end'}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<AiOutlineSearch color='#D1D2D5' size={20} />}
                        />
                        <Input type='text' placeholder='Enter search ...' focusBorderColor="##44D7B6" />
                    </InputGroup>

                    <HStack mt={4} mb={4}>
                        <Text>Add new</Text>
                        <GroupChatModal>
                            <Circle cursor={'pointer'} size='40px' bg='#44D7B6' color='white' onClick={handleAddGroup}>
                                <AiOutlinePlus size={20} />
                            </Circle>
                        </GroupChatModal>
                    </HStack>
                </VStack>

                {/* Message List Item */}
                <Flex
                    flexDirection={'column'}
                    flex={1}
                    overflowY={'scroll'}
                    alignItems={'center'}
                    sx={{
                        "::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    <MessageListItem />
                    <MessageListItem />
                    <MessageListItem />
                    <MessageListItem />
                </Flex >
            </Flex>
        );
    }

    const renderChatBox = () => {
        return (
            <Flex
                flexDirection={'column'}
                w={'40%'}
                borderRightWidth={1}
                borderRightColor={'#D1D2D5'}
            >
                {/* Header */}
                <Flex
                    flexDirection={'row'}
                    p={4}
                    borderBottomWidth={1}
                    borderBottomColor={'#D1D2D5'}
                >
                    <Image
                        borderRadius='full'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                        boxSize='60px'
                    />

                    <VStack w={'100%'} ml={2} alignItems={'flex-start'}>
                        <Text as='b'>Minh Trang</Text>
                        <Text color={'#676767'}>Online</Text>
                    </VStack>

                    <HStack w={'50%'} alignItems={'flex-start'} justifyContent={'flex-end'} >
                        <Icon color={'#676767'} boxSize={5} as={AiFillPhone} />
                        <Icon color={'#676767'} boxSize={5} as={AiTwotoneVideoCamera} />
                        <Icon color={'#676767'} boxSize={6} as={AiOutlineSmallDash} />
                    </HStack>
                </Flex>

                <Flex
                    flexDirection={'column'}
                    flex={1}
                    p={4}
                    overflowY={'scroll'}
                    sx={{
                        "::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    <Message left={true} />
                    <Message left={false} />
                    <Message left={true} />
                    <Message left={false} />
                </Flex>

                <Flex h={'15%'} p={4} justifyContent={'center'} alignItems={'center'}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.2em'
                            children={<GrAttachment />}
                        />
                        <Input placeholder='Type a message ...' bg={'#F9F8F8'} focusBorderColor='#44D7B6' />
                        <InputRightElement
                            children={
                                <Circle cursor={'pointer'} mr={-6} size='40px' bg='#44D7B6' color='white' onClick={() => console.log('Click')}>
                                    <AiOutlineSend size={20} />
                                </Circle>
                            }
                        />
                    </InputGroup>
                </Flex>
            </Flex>
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
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'
                    boxSize='180px'
                />
                <Text mt={2} mb={2} fontWeight={'bold'}>Minh Trang</Text>
                <Text mb={2}>Bla bla bla</Text>
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
                {renderUserList()}
                {renderChatBox()}
                {renderDetailUser()}
            </Flex>
        </Box>
    )
};

export default Home;