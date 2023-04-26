import constants from '../constants';
import { toast } from "react-toastify";
import axiosInstance from '../config/axios';

const getAllChat = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axiosInstance.get(constants.GET_ALL_CHATS, config);
        if (response.data.success) {
            return response.data.result;
        } else {
            toast.error(response.data.error);
            return [];
        }
    } catch (error) {
        console.log('getAllChat: ', error);
        toast.error('Request timeout! Please try again.');
    }
}

const searchUser = async (search, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axiosInstance.get(`${constants.SEARCH}search=${search}`, config);
        if (response.data.success) {
            return response.data.result;
        } else {
            toast.error(response.data.error);
            return [];
        }
    } catch (error) {
        console.log('searchUser: ', error);
        toast.error('Request timeout! Please try again.');
    }
}

const accessChat = async (userId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axiosInstance.post(constants.GET_CHAT, { userId }, config);
        if (response.data.success) {
            return response.data.result;
        } else {
            toast.error(response.data.error);
            return [];
        }
    } catch (error) {
        console.log('accessChat: ', error);
        toast.error('Request timeout! Please try again.');
    }
}

const fetchMessages = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url = constants.GET_MESSAGE + '/' + id;
        const response = await axiosInstance.get(url, config);
        if (response.data.success) {
            return response.data.result;
        } else {
            toast.error(response.data.error);
            return [];
        }
    } catch (error) {
        console.log('fetchMessages: ', error);
        toast.error('Request timeout! Please try again.');
    }
}

const sendNewMessage = async (data, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axiosInstance.post(constants.POST_MESSAGE, data, config);
        if (response.data.success) {
            return response.data.result;
        } else {
            toast.error(response.data.error);
            return [];
        }
    } catch (error) {
        console.log('accessChat: ', error);
        toast.error('Request timeout! Please try again.');
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllChat,
    searchUser,
    accessChat,
    fetchMessages,
    sendNewMessage
}