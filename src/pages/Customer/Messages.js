
import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { messageIcon } from '../../assets/icons';
import DualPaneIntro from '../../components/DualPaneIntro';
import MessagesItem from '../../components/MessagesItem';
import Message from './Message';

export default function Messages() {

  const match = useRouteMatch();

  const location = useLocation();

  return (
    <section>
     
      <div className="lg:flex lg:gap-5">
        <div className="container-x lg:w-auto">
          <ul className={`py-4 ${location.pathname !== '/messages' && 'hidden'} lg:block lg:w-80`}>
            <MessagesItem 
              href="/messages/2"
              message={{
                id: 2,
                date: '26 Oct',
                sender_name: 'Ben stores',
                sender_photo: 'r2.jpg',
                unread_messages_count: 1,
                last_message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                last_message_status: 'read'
              }} />
            <MessagesItem 
              href="/messages/2"
              message={{
                id: 1,
                date: '25 Oct',
                sender_name: 'DailyNeeds Support',
                sender_photo: 'user.jpg',
                unread_messages_count: 3,
                last_message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                last_message_status: 'read'
              }} />
          </ul>
        </div>

        <Switch>
          <Route path={`${match.url}/:ID`} render={()=> <Message />} />
          <Route 
            path={match.url} 
            render={()=> <DualPaneIntro icon={messageIcon} text="_message.Start_a_conversation" />} 
            />
        </Switch>
      </div>

    </section>
  );
}

