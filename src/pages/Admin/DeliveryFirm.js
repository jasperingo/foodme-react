
import React, { useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { editIcon, emailIcon, messageIcon, phoneIcon, reviewIcon } from '../../assets/icons';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import Tab from '../../components/Tab';

const NAV_LINKS = [
  { title : '_delivery.Routes', href: '' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_order.Orders', href: '/orders' },
  { title : '_transaction.Transactions', href: '/transactions' }
];

function Transactions() {
  
  return (
    <div>Transactions...</div>
  )
}

function Orders() {
  
  return (
    <div>Orders...</div>
  )
}

function Reviews() {
  
  return (
    <div>Reviews...</div>
  )
}

function Routes() {
  
  return (
    <div>Routes...</div>
  )
}

export default function DeliveryFirm() {

  

  return (
    <section>
      <div className="container-x">
        Delivery firm
      </div>
    </section>
  );
}
