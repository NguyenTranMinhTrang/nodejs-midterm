import React, { useState, useEffect } from "react";
import {
    VStack,
    Flex,
    Text,
    Input,
    Tooltip,
    Button,
} from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlineSearch, } from "react-icons/ai";
import MessageListItem from "./MessageListItem";
import services from "../services";
import { ChatState } from "../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import _ from "lodash";
import UserListItem from "./UserListItem";
import { toast } from "react-toastify";
import utils from "../utils";

const ListChat = () => {
    const user = utils.getDataFromLocal('user');
    const {
        chats,
        setChats,
        setSelectedChat
    } = ChatState();
    const [listChat, setListChat] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getListChat = async () => {
        const list = await services.getAllChat(user.token);
        setListChat(list);
        setResultSearch(list);
    }

    useEffect(() => {
        getListChat();
    }, []);

    const handleFunction = async (userId) => {
        const getChat = await services.accessChat(userId, user.token);
        console.log('getChat: ', getChat);
        if (!chats.find((c) => c._id === getChat._id)) setChats([getChat, ...chats]);
        setSelectedChat(getChat);
        onClose();
    }

    const handleSearch = async (text) => {
        if (!text) {
            toast.error('Please enter something to search !');
        } else {
            setLoading(true);
            const response = await services.searchUser(text, user.token);
            setResultSearch(response);
            setLoading(false);
        }
    }

    return (
        <Flex
            flexDirection={'column'}
            w={'30%'}
            borderRightWidth={1}
            borderRightColor={'#D1D2D5'}
        >
            {/* Search */}
            <VStack p={4} alignItems={'flex-end'}>
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button onClick={onOpen} w={'100%'} leftIcon={<AiOutlineSearch color="white" />} bg={'#44D7B6'} variant='solid'>
                        <Text d={{ base: "none", md: "flex" }} color={'white'}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
            </VStack>

            {/* Message List Item */}
            {
                resultSearch &&
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
                    {
                        _.map(listChat, (chat) => {
                            return <MessageListItem chat={chat} />
                        })
                    }
                </Flex >
            }

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Flex flexDirection={'row'} justifyContent={'flex-end'} pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                focusBorderColor='#38B2AC'
                                border
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Flex>

                        {loading ? (
                            <ChatLoading />
                        ) : (
                            <VStack mt={2}>
                                {
                                    resultSearch?.map((user) => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleFunction(user._id)}
                                        />
                                    ))
                                }
                            </VStack>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
}

export default ListChat;