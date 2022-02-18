
import React, { useState } from 'react'
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';
import ScrollList from '../list/ScrollList';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
import Loading from '../Loading';
import Reload from '../Reload';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import { cancelIcon, routeIcon } from '../../assets/icons';
import NotFound from '../NotFound';
import Forbidden from '../Forbidden';
import Icon from '@mdi/react';
import FormButtonField from './FormButtonField';
import H4Heading from '../H4Heading';
import { useTranslation } from 'react-i18next';

function Item(
  { 
    route: { id, state, city },
    onItemSelected
  }
) {

  return (
    <button onClick={()=> onItemSelected({ id, state, city })} className="w-full flex gap-2 items-center mb-4 border p-2 rounded">
      <Icon path={routeIcon} className="w-6 h-6 text-color-primary" />
      <div>{ city }, { state }</div>
    </button>
  );
}

function RouteList({ onCancel, onItemSelected, title, routes, routesFetchStatus, routesPage, routesNumberOfPages, refetch }) {

  const { t } = useTranslation();

  return (
    <div>
      <div className="container-x">

        <div className="flex gap-2 mt-4 items-center">
          <H4Heading text={title} />
          <div className="flex-grow text-right">
            <button onClick={onCancel} className="inline-flex gap-2 items-center text-red-500">
              <span>{ t('_extra.Cancel') }</span>
              <Icon path={cancelIcon} className="w-5 h-5" />
            </button>
            </div>
        </div>

        <ScrollList
          data={routes}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(routesPage, routesNumberOfPages, routesFetchStatus)}
          className="list-3-x"
          renderDataItem={(item)=> (
            <li key={`route-${item.id}`}> <Item route={item} onItemSelected={onItemSelected} /> </li>
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

export default function DeliveryLinkRouteForm(
  {
    deliveryRoute,
    deliveryRoutes,
    deliveryRoutesFetchStatus,
    deliveryRoutesPage,
    deliveryRoutesNumberOfPages,
    deliveryRouteRefetch,

    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    originError, 
    destinationError
  }
) {

  const [valueFor, setValueFor] = useState(0);

  const [originID, setOriginID] = useState(
    deliveryRoute.origin_route ? deliveryRoute.origin_route.id : null
  );

  const [origin, setOrigin] = useState(
    deliveryRoute.origin_route ? 
    `${deliveryRoute.origin_route.city}, ${deliveryRoute.origin_route.state}` : null
  );

  const [destinationID, setDestinationID] = useState(
    deliveryRoute.destination_route ? deliveryRoute.destination_route.id : null
  );

  const [destination, setDestination] = useState(
    deliveryRoute.destination_route ? 
    `${deliveryRoute.destination_route.city}, ${deliveryRoute.destination_route.state}` : null
  );
  
  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(originID, destinationID);
  }

  function originSelected(value) {
    setValueFor(0);
    setOriginID(value.id);
    setOrigin(`${value.city}, ${value.state}`);
  }

  function destinationSelected(value) {
    setValueFor(0);
    setDestinationID(value.id);
    setDestination(`${value.city}, ${value.state}`);
  }

  if (valueFor === 1) {
    return (
      <RouteList 
        onCancel={()=> setValueFor(0)}
        title="_delivery.Origin_location"
        onItemSelected={originSelected} 
        routes={deliveryRoutes} 
        routesFetchStatus={deliveryRoutesFetchStatus} 
        routesPage={deliveryRoutesPage}
        routesNumberOfPages={deliveryRoutesNumberOfPages}
        refetch={deliveryRouteRefetch}
        />
    );
  }

  if (valueFor === 2) {
    return (
      <RouteList 
        onCancel={()=> setValueFor(0)}
        title="_delivery.Destination_location"
        onItemSelected={destinationSelected} 
        routes={deliveryRoutes} 
        routesFetchStatus={deliveryRoutesFetchStatus} 
        routesPage={deliveryRoutesPage}
        routesNumberOfPages={deliveryRoutesNumberOfPages}
        refetch={deliveryRouteRefetch}
        />
    );
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormButtonField 
        onButtonClick={()=> setValueFor(1)}
        ID="origin-input"
        label="_delivery.Origin_location"
        value={origin}
        error={originError}
        />

      <FormButtonField 
        onButtonClick={()=> setValueFor(2)}
        ID="destination-input"
        label="_delivery.Destination_location"
        value={destination}
        error={destinationError}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
