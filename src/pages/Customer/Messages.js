
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { messageIcon } from '../../assets/icons';
import DualPaneIntro from '../../components/DualPaneIntro';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ScrollList from '../../components/list/ScrollList';
import MessagesItem from '../../components/list_item/MessagesItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useMessageChatList } from '../../hooks/message/messageChatListHook';
import { useListFooter } from '../../hooks/viewHook';
import Message from './Message';

export default function Messages() {

  useHeader({ 
    title: `Messages - DailyNeeds`,
  });

  const { t } = useTranslation();

  const match = useRouteMatch();

  const location = useLocation();

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
    fetch, 
    onResponse,
    chats, 
    chatsLoading, 
    chatsError, 
    chatsLoaded, 
    chatsEnded,
    retryFetch
  ] = useMessageChatList(customerToken);

  useEffect(
    function() {
      if (!chatsEnded) fetch();
    },
    [chatsEnded, fetch]
  );

  useEffect(
    function() {
      return onResponse();
    },
    [onResponse]
  );
  
  return (
    <section>

      <div className="container-x">
        {
          ('Notification' in window && Notification.permission !== 'granted') &&
          <div className="text-right">
            <button 
                onClick={()=> {
                  Notification.requestPermission()
                    .then(permission => {
                      console.log(permission);
                    })
                    .catch(err => console.error(err))
                }}
                className="btn-color-primary my-2 rounded p-1"
                >
                { t('_extra.Enable_notifications') }
            </button>
          </div>
        }

        <div className="lg:flex lg:gap-5">

          <div className="container-x lg:w-auto">

            <ScrollList
              data={chats}
              nextPage={fetch}
              hasMore={!chatsEnded}
              className={`py-4 ${location.pathname !== '/messages' && 'hidden'} lg:block lg:w-80`}
              renderDataItem={(item)=> (
                <MessagesItem 
                  key={`chat-${item.id}`}
                  userId={customer.user.id}
                  chat={item} 
                  />
              )}
              footer={listFooter([
                {
                  canRender: chatsLoading,
                  render() { 
                    return ( 
                      <li key="chat-footer"> 
                        <Loading /> 
                      </li> 
                    ); 
                  },
                },
                {
                  canRender: !chatsEnded,
                  render() {
                    return (
                      <li key="chat-footer"> 
                        <FetchMoreButton action={fetch} /> 
                      </li> 
                    );
                  }
                },
                {
                  canRender: chatsError === NetworkErrorCodes.UNKNOWN_ERROR,
                  render() { 
                    return (
                      <li key="chat-footer"> 
                        <Reload action={retryFetch} /> 
                      </li> 
                    );
                  },
                },
                {
                  canRender: chatsLoaded && chats.length === 0,
                  render() { 
                    return (
                      <li key="chat-footer"> 
                        <EmptyList text="_empty.No_message" icon={messageIcon} /> 
                      </li> 
                    );
                  }
                }
              ])}
              />
          </div>

          <Switch>
            <Route path={`${match.url}/:ID`} render={()=> <Message />} />
            <Route 
              path={match.url} 
              render={()=> <DualPaneIntro icon={messageIcon} text="_message.Start_a_conversation" />} 
              />
          </Switch>
        </div>

      </div>

    </section>
  );
}

