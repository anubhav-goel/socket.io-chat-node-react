import React from 'react';
import io from 'socket.io-client';
export const CTX = React.createContext();

/* 
    msg : {
        from : 'user',
        msg : 'hello',
        topic : 'general'
    }

    state : {
        topic1: [
            {msg},{msg},{msg}}
        ],
        topic2: [
            {msg},{msg},{msg}}
        ]
    }
*/

const initState = {
    general: [],
    top_secret: []
};
const reducer = (state, action) => {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [...state[topic], { from, msg }]
            };
        default:
            return state;
    }
};

let socket;

const sendChatAction = value => {
    socket.emit('chat message', value);
};

const Store = props => {
    const [allChats, dispatch] = React.useReducer(reducer, initState);
    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', msg => {
            console.log('message client::::', msg);
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
        });
    }

    const user = 'aaron' + Math.random(100).toFixed(2);
    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    );
};

export default Store;
