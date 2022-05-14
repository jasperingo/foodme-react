
import React, { useEffect, useRef, } from 'react';
import { useParams } from 'react-router-dom';
import { messageIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useMessageMessgeList } from '../../hooks/message/messageMessageListHook';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import ScrollList from '../list/ScrollList';
import MessageItem from '../list_item/MessageItem';
import Loading from '../Loading';
import Reload from '../Reload';

export default function MessageList({ newMessage, messageReceived, userToken, userId }) {

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
    onSendMessage,
    onMessageSent
  ] = useMessageMessgeList(userToken);

  useEffect(
    function() {
      if (!messagesLoaded && messagesError === null) messagesFetch(ID);
    },
    [ID, messagesLoaded, messagesError, messagesFetch]
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
            canRender: messagesError === NetworkErrorCodes.UNKNOWN_ERROR,
            render() { 
              return (
                <li key="message-footer"> 
                  <Reload action={()=> messagesFetch(ID)} /> 
                </li> 
              );
            },
          },
          {
            canRender: messagesError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() { 
              return (
                <li key="message-footer"> 
                  <Reload message="_errors.No_netowrk_connection" action={()=> messagesFetch(ID)} /> 
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
          },
          {
            canRender: !messagesEnded,
            render() {
              return (
                <li key="message-footer"> 
                  <FetchMoreButton action={()=> messagesFetch(ID)} /> 
                </li> 
              );
            }
          },
        ])}
        />
    </div>
  );
}
