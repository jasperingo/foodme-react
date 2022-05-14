
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useMessageChatFetch } from '../../hooks/message/messageChatFetchHook';
import MessageForm from '../form/MessageForm';
import MessageList from '../list/MessageList';
import Reload from '../Reload';
import MessageHeader from './MessageHeader';

export default function MessagesList({ userToken, userId }) {
  
  const { ID } = useParams();

  const [newMessage, setNewMessage] = useState(null);

  const [
    fetchChat, 
    onResponse,
    chat, 
    chatLoading, 
    chatError,
    chatID,
    unfetchChat,
    onChatRead
  ] = useMessageChatFetch(userToken);

  useEffect(
    function() {
      if ((chat !== null || chatError !== null) && String(chatID) !== ID) 
        unfetchChat();
      else if (chat === null && chatError === null)
        fetchChat(ID);
    },
    [ID, chat, chatError, chatID, fetchChat, unfetchChat]
  );

  useEffect(
    function() {
      return onResponse(ID);
    },
    [ID, onResponse]
  );

  useEffect(onChatRead, [onChatRead]);

  return (
    <section 
      className={`
        fixed top-0 left-0 w-full z-50 
        flex-grow bg-color h-full flex flex-col 
        lg:static lg:w-auto lg:justify-evenly lg:h-screen
      `}
      >
      
      <MessageHeader loading={chatLoading} userId={userId} chat={chat} />

      {
        chatError === NetworkErrorCodes.UNKNOWN_ERROR &&
        <Reload action={()=> fetchChat(ID)} />
      }

      {
        chatError === NetworkErrorCodes.NO_NETWORK_CONNECTION &&
        <Reload message="_errors.No_netowrk_connection" action={()=> fetchChat(ID)} />
      }

      {
        chat !== null &&
        <>
          <MessageList 
            userId={userId}
            userToken={userToken}
            newMessage={newMessage} 
            messageReceived={()=> setNewMessage(null)} 
            />

          <MessageForm onSend={(text)=> setNewMessage(text)} />
        </>
      }
    </section>
  );
}
