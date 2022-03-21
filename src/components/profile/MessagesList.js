
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { messageIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useMessageChatFetch } from '../../hooks/message/messageChatFetchHook';
import { useMessageMessgeList } from '../../hooks/message/messageMessageListHook';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import MessageForm from '../form/MessageForm';
import ScrollList from '../list/ScrollList';
import MessageItem from '../list_item/MessageItem';
import Loading from '../Loading';
import Reload from '../Reload';
import MessageHeader from './MessageHeader';

function List({ newMessage, messageReceived, userToken, userId }) {

  const { ID } = useParams();

  const listFooter = useListFooter();

  const section = useRef(null);

  const [
    messagesFetch, 
    messagesOnResponse,
    messages, 
    messagesLoading, 
    messagesError, 
    messagesLoaded, 
    messagesEnded,
    messagesRetryFetch,
    onSendMessage,
    onMessageSent
  ] = useMessageMessgeList(userToken);

  useEffect(
    function() {
      if (!messagesEnded) messagesFetch(ID);
    },
    [ID, messagesEnded, messagesFetch]
  );

  useEffect(
    function() {
      return messagesOnResponse();
    },
    [messagesOnResponse]
  );

  useEffect(
    function() {
      if (newMessage !== null) {
        onSendMessage(newMessage, userId);
        messageReceived();
        setTimeout(function() {
          section.current.scrollTop = section.current.scrollHeight;
        })
      }
    },
    [userId, newMessage, messageReceived, onSendMessage]
  );

  return (
    <div ref={section} className="flex-grow overflow-y-auto">

      <ScrollList
        data={messages}
        nextPage={messagesFetch}
        hasMore={!messagesEnded}
        inverse={true}
        className="container-x"
        renderDataItem={(item)=> (
          <MessageItem 
            message={item}
            receiverId={ID}
            userId={userId}
            onSend={onMessageSent}
            userToken={userToken}
            key={`message-${item.id < 1 ? item.clientId : item.id}`}
            />
        )}
        header={listFooter([
          {
            canRender: messagesLoading,
            render() { 
              return ( 
                <li key="message-footer"> 
                  <Loading /> 
                </li> 
              ); 
            },
          },
          {
            canRender: !messagesEnded,
            render() {
              return (
                <li key="message-footer"> 
                  <FetchMoreButton action={messagesFetch} /> 
                </li> 
              );
            }
          },
          {
            canRender: messagesError === NetworkErrorCodes.UNKNOWN_ERROR,
            render() { 
              return (
                <li key="message-footer"> 
                  <Reload action={messagesRetryFetch} /> 
                </li> 
              );
            },
          },
          {
            canRender: messagesLoaded && messages.length === 0,
            render() { 
              return (
                <li key="message-footer"> 
                  <EmptyList text="_empty.No_message" icon={messageIcon} /> 
                </li> 
              );
            }
          }
        ])}
        />
    </div>
  );
}

export default function MessagesList({ userToken, userId }) {
  
  const { ID } = useParams();

  const [newMessage, setNewMessage] = useState(null);

  const [
    fetch, 
    onResponse,
    chat, 
    chatLoading, 
    chatError,
    chatID,
    unfetch,
    onChatRead
  ] = useMessageChatFetch(userToken);

  useEffect(
    function() {
      if ((chat !== null || chatError !== null) && String(chatID) !== ID) 
        unfetch();
      else if (chat === null && chatError === null)
        fetch(ID);
    },
    [ID, chat, chatError, chatID, fetch, unfetch]
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
        <Reload action={fetch} />
      }

      {
        chat !== null &&
        <>
          <List 
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
