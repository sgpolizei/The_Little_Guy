/**
 * THIS FEATURE IS IN DEVELOPMENT! NOT CURRENTLY BEING USED (YET)
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageList from '../components/MessageList';

const Messages = () => {
    // socketio
    const state = useSelector((state) => state);
    return (
        <>
        <h1><h1 className="uk-heading-small uk-flex uk-flex-center">{ state.user ? `${state.user.username}, you have socketio messages!` : null }</h1></h1>

        {/* <div className="uk-flex uk-flex-center uk-width-1-2 uk-margin-top">
            <MessageList/>
        </div> */}

        </>

    )
}

export default Messages;