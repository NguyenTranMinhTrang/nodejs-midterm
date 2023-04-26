import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../utils";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const userInfo = utils.getDataFromLocal('user');
        setUser(userInfo);
        console.log('userInfo: ', userInfo);
        console.log('user ChatProvider: ', user);

        if (!userInfo) navigate('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;