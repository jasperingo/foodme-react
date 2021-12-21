
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RouteApi from '../../api/RouteApi';
import { routeIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import TheRouteItem from '../../components/TheRouteItem';
import { FETCH_STATUSES, getRoutesListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function TheRoutes() {

  const {
    //user: { user },
    routes: {
      routes: {
        routes,
        routesFetchStatus,
        routesPage,
        routesNumberOfPages
      }
    }, 
    routesDispatch
  } = useAppContext();

  useEffect(()=> {
    if (routesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new RouteApi(); //(user.api_token);
      api.getList(0, routesPage, routesDispatch);
    }
  });

  function refetchRoutes() {
    if (routesFetchStatus !== FETCH_STATUSES.LOADING) 
      routesDispatch(getRoutesListFetchStatusAction(FETCH_STATUSES.LOADING));
  }


  return (
    <section>
      <div className="container-x">

        <AddButton text="_delivery.Add_route" href="/route/add" />

        <InfiniteScroll 
          dataLength={routes.length}
          next={refetchRoutes}
          hasMore={useHasMoreToFetchViaScroll(routesPage, routesNumberOfPages, routesFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                routes, 
                routesFetchStatus,
                (item, i)=> <TheRouteItem key={`route-${i}`} route={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchRoutes} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" icon={routeIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchRoutes} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>

      </div>
    </section>
  );
}
