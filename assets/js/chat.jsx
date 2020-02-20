import React, { useState, useEffect, useRef } from 'react';
import { Socket } from "phoenix"

const Chat = () => {
    let socket = useRef();
    let channel = useRef();

    let [messages, setMessages] = useState([]);
    let [count, setCount] = useState(0);
    let [joinedChannel, setJoinedChannel] = useState(false);

    useEffect(() => {
        socket.current = new Socket("/socket", { params: { token: window.userToken } });
        socket.current.connect();
    }, []);

    let content = messages.map((payload, index) => {
        return <div key={index}>{payload.name}: {payload.message}</div>
    });

    let sendMessage = () => {
        channel.current.push('shout', { name: 'test', message: 'test message' });
    };

    let joinRoom = function() {
        setJoinedChannel(true);
        channel.current = socket.current.channel("chat_room:lobby", {});

        channel.current
            .join()
            .receive('ok', resp => {
                console.log('Joined successfully', resp);
            })
            .receive('error', resp => {
                console.log('Unable to join', resp);
            });

        channel.current.on('shout', payload => {
            setMessages(prev => prev.concat([payload]));
        });

    };

    return (
        <>
            {!joinedChannel ? <button type="button" onClick={joinRoom}>Join Room</button> : ''}
            <div id='message-list' className='row'>
                {content}
            </div>

            <div className='row form-group'>
                <div className='col-md-3'>
                    <input type='text' id='name' className='form-control' placeholder='Name' />
                </div>
                <div className='col-md-9'>
                    <input type='text' id='message' className='form-control' placeholder='Message' />
                </div>
                <button type="button" onClick={sendMessage}>Send</button>
            </div>
        </>
    );
}

export default Chat;