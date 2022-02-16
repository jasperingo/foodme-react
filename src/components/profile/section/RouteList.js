
import React from 'react';
import { routeIcon } from '../../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import FetchMoreButton from '../../FetchMoreButton';
import Forbidden from '../../Forbidden';
import ScrollList from '../../list/ScrollList';
import DeliveryRouteItem from '../../list_item/DeliveryRouteItem';
import Loading from '../../Loading';
import NotFound from '../../NotFound';
import Reload from '../../Reload';

export default function RouteList({ routes, routesFetchStatus, routesPage, routesNumberOfPages, refetch }) {

  return (
    <div>
      <div className="container-x">

        <ScrollList
          data={routes}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(routesPage, routesNumberOfPages, routesFetchStatus)}
          className="list-3-x"
          renderDataItem={(item)=> (
            <li key={`route-${item.id}`}> <DeliveryRouteItem route={item} /> </li>
          )}
          footer={useRenderListFooter(
            routesFetchStatus,
            ()=> <li key="product-footer"> <Loading /> </li>, 
            ()=> <li key="product-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="product-footer"> <EmptyList text="_empty.No_route" icon={routeIcon} /> </li>,
            ()=> <li key="product-footer"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="product-footer"> <NotFound /> </li>,
            ()=> <li key="product-footer"> <Forbidden /> </li>,
          )}
          />

      </div>
    </div>
  );
}
