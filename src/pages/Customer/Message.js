
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { messageIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import MessageForm from '../../components/form/MessageForm';
import ScrollList from '../../components/list/ScrollList';
import MessageItem from '../../components/list_item/MessageItem';
import Loading from '../../components/Loading';
import MessageHeader from '../../components/profile/MessageHeader';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useMessageChatFetch } from '../../hooks/message/messageChatFetchHook';
import { useMessageMessgeList } from '../../hooks/message/messageMessageListHook';
import { useListFooter } from '../../hooks/viewHook';

function List({ newMessage, messageReceived }) {

  const { ID } = useParams();

  const listFooter = useListFooter();

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [
    messagesFetch, 
    messagesOnResponse,
    messages, 
    messagesLoading, 
    messagesError, 
    messagesLoaded, 
    messagesEnded,
    messagesRetryFetch,
    onSendMessage
  ] = useMessageMessgeList(customerToken);

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
        onSendMessage(newMessage, customer.id);
        messageReceived();
      }
    },
    [customer.id, newMessage, messageReceived, onSendMessage]
  );

  return (
    <div className="container-x">

      <ScrollList
        data={messages}
        nextPage={messagesFetch}
        hasMore={!messagesEnded}
        inverse={true}
        renderDataItem={(item, index)=> (
          <MessageItem 
            key={`message-${index}-${item.id}`}
            message={item}
            index={index}
            userId={customer.id}
            />
        )}
        footer={listFooter([
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

export default function Message() {

  const { ID } = useParams();

  const [newMessage, setNewMessage] = useState(null);

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [
    fetch, 
    onResponse,
    chat, 
    chatLoading, 
    chatError,
    chatID,
    unfetch
  ] = useMessageChatFetch(customerToken);

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

  return (
    <section className="flex-grow">

      {
        chatLoading &&
        <Loading />
      }

      {
        chatError === NetworkErrorCodes.UNKNOWN_ERROR &&
        <Reload action={fetch} />
      }

      {
        chat !== null &&
        <>
          <MessageHeader recipient={ID} chat={chat} />

          <List newMessage={newMessage} messageReceived={()=> setNewMessage(null)} />

          <MessageForm 
            onSend={(text)=> {
              setNewMessage(text);
            }}
            />
        </>
      }
    </section>
  );
}



