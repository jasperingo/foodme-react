
import React from 'react';
import { routeIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import ScrollList from './ScrollList';
import DeliveryRouteItem from '../list_item/DeliveryRouteItem';
import FetchMoreButton from '../FetchMoreButton';
import EmptyList from '../EmptyList';
import Loading from '../Loading';
import Forbidden from '../Forbidden';
import NotFound from '../NotFound';
import Reload from '../Reload';

export default function RouteList(
  { routes, routesLoading, routesLoaded, routesError, routesPage, routesNumberOfPages, fetchRoutes, refreshList }
) {

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={routes}
        nextPage={fetchRoutes}
        refreshPage={refreshList}
        hasMore={loadOnScroll(routesPage, routesNumberOfPages, routesError)}
        className="list-3-x"
        renderDataItem={(item)=> (
          <li key={`route-${item.id}`}> <DeliveryRouteItem route={item} /> </li>
        )}
        footer={listFooter([
          { 
            canRender: routesLoading, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <Loading /> </li>;
            }
          }, 
          { 
            canRender: routesError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <Reload action={fetchRoutes} /> </li>;
            }
          },
          { 
            canRender: routesLoaded && routes.length === 0, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_route" icon={routeIcon} /> </li>;
            }
          },
          { 
            canRender: routesPage <= routesNumberOfPages, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <FetchMoreButton action={fetchRoutes} /> </li>;
            }
          },
          { 
            canRender: routesError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <NotFound /> </li>;
            }
          },
          { 
            canRender: routesError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <Forbidden /> </li>;
            }
          },
          { 
            canRender: routesError === NetworkErrorCodes.NO_NETWORK_CONNECTION, 
            render() { 
              return <li key="route-footer" className="list-3-x-col-span"> <Reload message="_errors.No_netowrk_connection" action={fetchRoutes} /> </li>;
            }
          },
        ])}
        />

    </div>
  );
};
