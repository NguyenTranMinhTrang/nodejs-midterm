import React from "react";
import { Box, VStack, Text } from '@chakra-ui/react';

const Message = ({ left }) => {
    return (
        <VStack alignItems={left ? 'flex-start' : 'flex-end'}>
            <Box w={'fit-content'} maxWidth={'70%'} borderRadius={40} bg={left ? 'white' : '#44D7B6'} p={4} shadow={'0 0 20px #ccc'}>
                <Text >Hello world my name is Trang</Text>
            </Box>
            <Text mt={-1} ml={1}>Yesterday, 4:10</Text>
        </VStack>
    );
}

export default Message;