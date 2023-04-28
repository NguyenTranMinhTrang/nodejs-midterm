import React, { useState, useEffect } from "react";
import {
    InputRightElement,
    VStack,
    Flex,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    Circle,
    Image,
    Icon,
    Spinner,
} from '@chakra-ui/react';
import { AiOutlineSend, AiFillPhone, AiTwotoneVideoCamera, AiOutlineSmallDash } from "react-icons/ai";
import Message from "../components/Message";
import { ChatState } from "../context/ChatProvider";
import { GrAttachment } from "react-icons/gr";
import services from "../services";
import { toast } from "react-toastify";
import io from "socket.io-client";
import _ from "lodash";
import ScrollableFeed from 'react-scrollable-feed';

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare, receiveChatCompare;

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const {
        user,
        selectedChat,
    } = ChatState();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMess();
        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
        socket.on("received message", (newMessageRecieved) => {
            console.log('newMessageRecieved: ', newMessageRecieved);
            if (
                !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!receiveChatCompare || receiveChatCompare._id !== newMessageRecieved._id) {
                    receiveChatCompare = newMessageRecieved;
                    toast.success(`You got a new message from ${newMessageRecieved.sender.name}`)
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const fetchMess = async () => {
        if (!selectedChat) return;
        setLoading(true);
        const messages = await services.fetchMessages(selectedChat._id, user.token);
        setMessages(messages);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    const sendMessage = async () => {
        if (newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const dataPost = {
                    content: newMessage,
                    chatId: selectedChat
                }
                setNewMessage("");
                const data = await services.sendNewMessage(dataPost, user.token);
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast.error('Request timeout! Please try again.');
            }
        }
    };

    const handleEnter = (event) => {
        if (event.key === "Enter" && newMessage) {
            sendMessage();
        }
    }


    return (
        <Flex
            flexDirection={'column'}
            w={'40%'}
            borderRightWidth={1}
            borderRightColor={'#D1D2D5'}
        >
            {
                selectedChat ?
                    <>
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
                                src={selectedChat?.users[1].avatar}
                                alt='Dan Abramov'
                                boxSize='60px'
                            />

                            <VStack w={'100%'} ml={2} alignItems={'flex-start'}>
                                <Text as='b'>{selectedChat?.users[1].name}</Text>
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
                            overflowY={'scroll'}
                            sx={{
                                "::-webkit-scrollbar": {
                                    display: "none",
                                },
                            }}
                        >
                            {loading ? (
                                <Spinner
                                    size="xl"
                                    w={20}
                                    h={20}
                                    alignSelf="center"
                                    margin="auto"
                                />
                            ) : (
                                <ScrollableFeed>
                                    {
                                        _.map(messages, (message) => {
                                            return (
                                                <Message
                                                    key={message._id}
                                                    left={message.sender._id !== user._id}
                                                    content={message.content}
                                                    time={message.createdAt}
                                                />
                                            );
                                        })
                                    }
                                </ScrollableFeed>
                            )}
                        </Flex>

                        <Flex h={'15%'} p={4} justifyContent={'center'} alignItems={'center'}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                    children={<GrAttachment />}
                                />
                                <Input
                                    placeholder='Type a message ...'
                                    bg={'#F9F8F8'}
                                    focusBorderColor='#44D7B6'
                                    value={newMessage}
                                    onChange={typingHandler}
                                    onKeyDown={handleEnter}
                                />
                                <InputRightElement
                                    children={
                                        <Circle cursor={'pointer'} mr={-6} size='40px' bg='#44D7B6' color='white' onClick={sendMessage}>
                                            <AiOutlineSend size={20} />
                                        </Circle>
                                    }
                                />
                            </InputGroup>
                        </Flex>
                    </>
                    :
                    <Flex alignItems="center" justifyContent="center" h="100%">
                        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                            Click on a user to start chatting
                        </Text>
                    </Flex>
            }
        </Flex>
    );
}

export default ChatBox;