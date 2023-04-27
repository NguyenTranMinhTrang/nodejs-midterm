import React from "react";
import { Flex, Image, VStack, Text } from '@chakra-ui/react';
import _ from "lodash";

const MessageListItem = ({ chat, handleClick }) => {
    const userChat = chat?.users[1];
    let timeDisplay;
    const time = new Date(chat.updatedAt);
    let hours = time.getHours();
    if (hours <= 0) {
        timeDisplay = `${time.getMinutes()} minutes`;
    } else {
        timeDisplay = `${hours}h`;
    }

    return (
        <Flex
            onClick={handleClick}
            _hover={{ opacity: 0.8 }}
            cursor={'pointer'}
            flexDirection={'column'}
            w={'90%'}
            mt={4}
            mb={4}
            p={4}
            bg={'white'}
            shadow={'0 0 20px #ccc'}
        >
            <Flex flexDirection={'row'}>
                <Image
                    borderRadius='full'
                    objectFit='cover'
                    src={userChat.avatar}
                    alt={userChat.name}
                    boxSize='60px'
                />

                <VStack w={'100%'} ml={2} alignItems={'flex-start'}>
                    <Text as='b'>{userChat.name}</Text>
                    <Text color={'#676767'}>Online</Text>
                </VStack>
                <VStack w={'40%'}>
                    <Text color={'#676767'}>{timeDisplay} ago</Text>
                </VStack>
            </Flex>
            {chat.unread && <Text mt={2} fontWeight={'medium'}>A new comming message ...</Text>}
        </Flex>
    );
}

export default MessageListItem;