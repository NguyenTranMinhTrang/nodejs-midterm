import React from "react";
import { Flex, Image, VStack, Text } from '@chakra-ui/react';
import formatDistance from "date-fns/formatDistance";
import _ from "lodash";
import { ChatState } from "../context/ChatProvider";

const MessageListItem = ({ chat, handleClick }) => {
    const { user } = ChatState();
    const userFind = _.filter(chat?.users, (userChat) => {
        return userChat._id !== user._id;
    });
    const latestMessage = chat?.latestMessage;
    let timeDisplay;
    if (latestMessage) {
        timeDisplay = formatDistance(new Date(latestMessage.createdAt), new Date());
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
                    src={userFind[0].avatar}
                    alt={userFind[0].name}
                    boxSize='60px'
                />

                <VStack w={'100%'} ml={2} alignItems={'flex-start'}>
                    <Text as='b'>{userFind[0].name}</Text>
                    <Text color={'#676767'}>Online</Text>
                </VStack>
                <VStack w={'100%'}>
                    <Text color={'#676767'}>{timeDisplay ? `${timeDisplay} ago` : ''}</Text>
                </VStack>
            </Flex>
        </Flex>
    );
}

export default MessageListItem;