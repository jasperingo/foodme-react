
import Icon from '@mdi/react';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { backIcon, messageIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useMessageChatList } from '../../hooks/message/messageChatListHook';
import { useNotificationEnable } from '../../hooks/notification/notificationEnableHook';
import { useListFooter } from '../../hooks/viewHook';
import DualPaneIntro from '../DualPaneIntro';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import ScrollList from '../list/ScrollList';
import MessagesItem from '../list_item/MessagesItem';
import Loading from '../Loading';
import Reload from '../Reload';

export default function ChatsList({ userId, userToken, renderMessages }) {

  const { t } = useTranslation();

  const match = useRouteMatch();

  const history = useHistory();

  const location = useLocation();

  const listFooter = useListFooter();

  const [canAskForNotify, askForNotify] = useNotificationEnable();

  const [
    fetch, 
    onResponse,
    chats, 
    chatsLoading, 
    chatsError, 
    chatsLoaded, 
    chatsEnded,
    retryFetch,
    onChatListOpened
  ] = useMessageChatList(userToken);

  useEffect(
    function() {
      onChatListOpened();
    },
    [onChatListOpened]
  );

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
    <section className="messaging-view">
      <div className="lg:flex lg:gap-5">

        <div className="container-x bg-color lg:w-auto lg:overflow-y-auto lg:h-screen">

          <div className="hidden lg:block my-2">
            <button 
              onClick={()=> history.goBack() }
              className="w-full py-4 flex gap-2 items-center hover:bg-color-gray-h"
              >
              <Icon path={backIcon} className="h-6 w-6" />
              <span>{ t('_extra.Back') }</span>
            </button>
          </div>

          {
            canAskForNotify &&
            <div className="text-right">
              <button 
                  onClick={askForNotify}
                  className="btn-color-primary my-2 rounded p-1"
                  >
                  { t('_extra.Enable_notifications') }
              </button>
            </div>
          }

          <ScrollList
            data={chats}
            nextPage={fetch}
            hasMore={!chatsEnded}
            className={`py-4 ${location.pathname !== '/messages' && 'hidden'} lg:block lg:w-80`}
            renderDataItem={(item)=> (
              <MessagesItem 
                key={`chat-${item.id}`}
                userId={userId}
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
          <Route path={`${match.url}/:ID`} render={renderMessages} />
          <Route 
            path={match.url} 
            render={()=> <DualPaneIntro icon={messageIcon} text="_message.Start_a_conversation" />} 
            />
        </Switch>
        
      </div>
    </section>
  );
}
