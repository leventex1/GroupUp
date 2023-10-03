import { useRef, useState, useEffect } from "react";

import InputField from "./components/InputField";
import ChatField from "./components/ChatField";

import { MessageType } from "./Types";
import { useColorSchema } from "@/contexts/ColorSchemaContext";

import socket from "@/api/socket";
import Config from "@/data/Config";

const RoomPage = () => {

    const Colors = useColorSchema();

    const randomId = useRef<string>(Math.floor(Math.random() * 1000).toString())
    const username = useRef<string>(sessionStorage.getItem('username'));

    const [ input, setInput ] = useState<string>('');
    const [ messages, setMessages ] = useState<MessageType[]>([]);


    const onPushMessage = (message: string) => {
        socket.emit('push message', message, username.current)
    }

    const onPullMessage = async () => {
        console.log('Fetching messages');
        const response = await fetch(Config.serverURL + '/api/message');
        const messages = await response.json();
        setMessages(messages.map((message: any): MessageType => ({
            id: message.public_id,
            message: message.message,
            username: message.username,
            createdAt: new Date(message.created_at)
        })));
    }
    
    /* Socket connected and disconnected when monted or unmounted. */
    useEffect(() => {
        socket.connect();
        socket.emit('join');
        socket.on('pull message', onPullMessage);
        onPullMessage();

        return () => { 
            socket.off('pull message', onPullMessage);
            socket.emit('leave');
            socket.disconnect();
        }
    }, []);

    const onSubmit = (e: React.MouseEvent<HTMLElement> | null) => {
        if(e) {
            e.preventDefault();
        }
        
        if(input) {
            onPushMessage(input);
        }
        setInput('');
    }

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            marginInline: 'auto',
            padding: '1rem',
            width: 'min(800px, calc(100%))',
            height: '100%',
        },

        inputFieldContainer: {
            width: '100%',
        },

        chatFieldContainer: {
            flexGrow: '2',
            width: '100%',
            overflowY: 'auto',
        },
    }

    return (
        <div style={styles.container}>

                <style>
                    {`
                        /* width */
                        ::-webkit-scrollbar {
                            width: 8px;
                        }

                        /* Track */
                        ::-webkit-scrollbar-track {
                            background: ${Colors?.secondary};
                        }
                        
                        /* Handle */
                        ::-webkit-scrollbar-thumb {
                            background: ${Colors?.accent}; 
                            border-radius: 8px;
                        }

                        /* Handle on hover */
                        ::-webkit-scrollbar-thumb:hover {
                            background: ${Colors?.primary}; 
                        }
                    `}
            </style>

            <div style={styles.chatFieldContainer}>
                <ChatField 
                    messages={messages}
                    username={username.current ? username.current : 'anonymus'}
                />
            </div>

            <div 
                id={randomId.current}
                style={styles.inputFieldContainer}    
            >
                <InputField 
                    input={input}
                    setInput={setInput}
                    onSubmit={onSubmit}
                />
            </div>

        </div>
    )
}

export default RoomPage;