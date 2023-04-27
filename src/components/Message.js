import React from "react";
import { Box, VStack, Text } from '@chakra-ui/react';

const Message = ({ left, content, time }) => {
    const getTime = new Date(time);
    const yyyy = getTime.getFullYear();
    let mm = getTime.getMonth() + 1;
    let dd = getTime.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    const timeFormat = getTime.getHours() + ":" + getTime.getMinutes();

    return (
        <VStack p={4} mt={2} alignItems={left ? 'flex-start' : 'flex-end'}>
            <Box w={'fit-content'} maxWidth={'70%'} borderRadius={40} bg={left ? 'white' : '#44D7B6'} p={4} shadow={'0 0 20px #ccc'}>
                <Text >{content}</Text>
            </Box>
            <Text mt={-1} ml={1}>{formattedToday}, {timeFormat}</Text>
        </VStack>
    );
}

export default Message;