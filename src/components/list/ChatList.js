
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Route, Switch, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { backIcon, messageIcon, notificationIcon, supportIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useMessageChatList } from '../../hooks/message/messageChatListHook';
import { useMessageContactSupport } from '../../hooks/message/messageContactSupport';
import { useMessageMemberGet } from '../../hooks/message/messageMemberGetHook';
import { useNotificationEnable } from '../../hooks/notification/notificationEnableHook';
import { useListFooter } from '../../hooks/viewHook';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import DualPaneIntro from '../DualPaneIntro';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import ScrollList from './ScrollList';
import ChatItem from '../list_item/ChatItem';
import Loading from '../Loading';
import Reload from '../Reload';

export default function ChatList({ isAdmin, userId, userToken, renderMessages }) {

  const { t } = useTranslation();

  const match = useRouteMatch();

  const history = useHistory();

  const location = useLocation();

  const getMember = useMessageMemberGet();

  const listFooter = useListFooter();

  const [errorDialog, setErrorDialog] = useState(null);

  const [canAskForNotify, askForNotify] = useNotificationEnable();

  const [
    fetchSupport, 
    onSupportResponse,
    support,
    supportLoading,
    supportError,
    supportDone
  ] = useMessageContactSupport();

  const [
    fetchChatList, 
    onResponse,
    chats, 
    chatsLoading, 
    chatsError, 
    chatsLoaded, 
    chatsEnded,
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
      if (!chatsLoaded && chatsError === null) fetchChatList();
    },
    [chatsLoaded, chatsError, fetchChatList]
  );

  useEffect(
    function() {
      return onResponse();
    },
    [onResponse]
  );

  useEffect(
    function() {
      if (supportLoading)
        return onSupportResponse();
      else if (support !== null) {
        history.push(`/messages/${getMember(support, userId).id}`);
        supportDone();
      }
    },
    [userId, history, support, supportLoading, onSupportResponse, supportDone, getMember]
  );
  
  useEffect(
    function() {
      if (supportError !== null)
        setErrorDialog({
          body: supportError,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setErrorDialog(null);
            }
          }
        });
    },
    [supportError]
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

          <ul className="flex gap-2 flex-wrap justify-between">
            {
              !isAdmin && 
              <li>
                <button 
                  onClick={fetchSupport}
                  className="flex items-center gap-1 btn-color-primary my-2 rounded p-1"
                  >
                  <Icon path={supportIcon} className="w-4 h-4" />
                  <div>{ t('_extra.Contact_support') }</div>
                </button>
                { supportLoading && <LoadingDialog /> }
                { errorDialog !== null && <AlertDialog /> }
              </li>
            }

            {
              canAskForNotify &&
              <li className="text-right">
                <button 
                  onClick={askForNotify}
                  className="flex items-center gap-1 btn-color-primary my-2 rounded p-1"
                  >
                  <Icon path={notificationIcon} className="w-4 h-4" />
                  <div>{ t('_extra.Enable_notifications') }</div>
                </button>
              </li>
            }
          </ul>

          <ScrollList
            data={chats}
            nextPage={fetch}
            hasMore={!chatsEnded}
            className={`py-4 ${location.pathname !== '/messages' && 'hidden'} lg:block lg:w-80`}
            renderDataItem={(item)=> (
              <ChatItem 
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
                      <FetchMoreButton action={fetchChatList} /> 
                    </li> 
                  );
                }
              },
              {
                canRender: chatsError === NetworkErrorCodes.UNKNOWN_ERROR,
                render() { 
                  return (
                    <li key="chat-footer"> 
                      <Reload action={fetchChatList} /> 
                    </li> 
                  );
                },
              },
              {
                canRender: chatsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
                render() { 
                  return (
                    <li key="chat-footer"> 
                      <Reload message="_errors.No_netowrk_connection" action={fetchChatList} /> 
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
