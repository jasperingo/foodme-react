
import React, { useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import { editIcon, emailIcon, messageIcon, phoneIcon, reviewIcon } from '../../assets/icons';
import Loading from '../../components/Loading';
import ProfileDetails from '../../components/ProfileDetails';
import ProfileHeader from '../../components/ProfileHeader';
import Reload from '../../components/Reload';
import Tab from '../../components/Tab';
import { DELIVERY_FIRM, FETCH_STATUSES, getDeliveryFirmsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

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

  const match = useRouteMatch();

  const dID = parseInt(useParams().ID);

  const {
    user: { user },
    deliveryFirms: {
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmFetchStatus
      }
    },
    deliveryFirmsDispatch
  } = useAppContext();

  useEffect(()=> {
    if (deliveryFirm !== null && dID !== deliveryFirm.id) {
      deliveryFirmsDispatch({ type: DELIVERY_FIRM.UNFETCH });
    } else if (deliveryFirmFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new DeliveryFirmApi(user.api_token);
      api.get(dID, deliveryFirmsDispatch);
    }
  }, [dID, user, deliveryFirm, deliveryFirmFetchStatus, deliveryFirmsDispatch]);

  function refetchDeliveryFirm() {
    if (deliveryFirmFetchStatus !== FETCH_STATUSES.LOADING) 
      deliveryFirmsDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            deliveryFirm, 
            deliveryFirmFetchStatus,
            ()=> (
              <div>
                <ProfileHeader
                  photo={`/photos/delivery-firm/${deliveryFirm.photo}`}
                  name={deliveryFirm.name}
                  links={[
                    {
                      href: `/messages/${deliveryFirm.id}`,
                      title: '_message.Message',
                      icon: messageIcon
                    },
                    {
                      href: `/delivery-firm/${deliveryFirm.id}/update`,
                      title: '_extra.Edit',
                      icon: editIcon
                    }
                  ]}
                  />

                <ProfileDetails 
                  details={[
                    {
                      icon: phoneIcon,
                      data: deliveryFirm.phone_number
                    },
                    {
                      icon: emailIcon,
                      data: deliveryFirm.email
                    },
                    {
                      icon: reviewIcon,
                      data: deliveryFirm.rating
                    }
                  ]}
                  />
                
                <Tab items={NAV_LINKS} keyPrefix="delivery-firm-tab" />

                <Switch>
                  <Route path={`${match.url}/transactions`} render={()=> <Transactions />} />
                  <Route path={`${match.url}/orders`} render={()=> <Orders />} />
                  <Route path={`${match.url}/reviews`} render={()=> <Reviews />} />
                  <Route path={match.url} render={()=> <Routes />} />
                </Switch>

              </div>
            ),
            (k)=> <div className="container-x"> <Loading /> </div>, 
            (k)=> <div className="container-x"> <Reload action={refetchDeliveryFirm} /> </div>,
          )
        }
      </div>
    </section>
  );
}
