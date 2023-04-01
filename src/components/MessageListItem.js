import React from "react";
import { Flex, Image, VStack, Text } from '@chakra-ui/react';

const MessageListItem = () => {
    return (
        <Flex flexDirection={'column'} w={'90%'} mt={4} mb={4} p={4} bg={'white'} shadow={'0 0 20px #ccc'}>
            <Flex flexDirection={'row'}>
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
                <VStack w={'30%'}>
                    <Text color={'#676767'}>3h ago</Text>
                </VStack>
            </Flex>
            <Text mt={2} fontWeight={'medium'}>A new comming message ...</Text>
        </Flex>
    );
}

export default MessageListItem;