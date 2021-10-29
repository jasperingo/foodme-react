
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Tab from '../../components/Tab';

const NAV_LINKS = [
  { title : '_message.Chats', href: '/chats' },
  { title : '_message.Notifications', href: '/notifications' }
];

export default function Messages() {

  const match = useRouteMatch();

  return (
    <section>
      <div className="container-x">
        <Tab items={NAV_LINKS} keyPrefix="messages-tab" />

        <Switch>
          <Route path={`${match.url}/chats`} render={()=> <div>Chat</div>} />
          <Route path={`${match.url}/notifications`} render={()=> <div>NOtify</div>} />
        </Switch>

      </div>
    </section>
  );
}

