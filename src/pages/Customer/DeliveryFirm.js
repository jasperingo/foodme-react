
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryFirmProfile from '../../components/profile/DeliveryFirmProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmRouteList } from '../../hooks/delivery_firm/deliveryFirmRouteListHook';
import { useDeliveryFirmFetch } from '../../hooks/delivery_firm/deliveryFrimFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

const NAV_LINKS = [
  { title : '_delivery.Routes', href: '' },
  { title : '_extra.Reviews', href: '/reviews' }
];


function DeliveryFirmRoutesList() {

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
    routes, 
    // productsFetchStatus, 
    // productsPage, 
    // productsNumberOfPages, 
    // refetch
  ] = useDeliveryFirmRouteList(customerToken);

  console.log(routes);
  
  return (
    <div>Delivery routes List...</div>
    // <ProductList 
    //   products={products}
    //   productsFetchStatus={productsFetchStatus}
    //   productsPage={productsPage}
    //   productsNumberOfPages={productsNumberOfPages}
    //   refetch={refetch}
    //   />
  );
}


export default function DeliveryFirm() {

  const match = useRouteMatch();

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
    deliveryFirm, 
    deliveryFirmFetchStatus,
    refetch
  ] = useDeliveryFirmFetch(customerToken);

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Delivery_firm',
    topNavPaths: ['/cart', '/search']
  });

  return (
    <section>

      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryFirmFetchStatus,
            ()=> <DeliveryFirmProfile deliveryFirm={deliveryFirm} navLinks={NAV_LINKS} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>

      {
        deliveryFirm && 
        <Switch>
          <Route path={`${match.url}/reviews`} render={()=> <div>Delivery reviews</div>} />
          <Route path={match.url} render={()=> <DeliveryFirmRoutesList />} />
        </Switch>
      }

    </section>
  );
}
