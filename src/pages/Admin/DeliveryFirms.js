
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import { deliveryIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import DeliveryFirmItem from '../../components/DeliveryFirmItem';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getDeliveryFirmsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function DeliveryFirms() {

  const {
    user: { user },
    deliveryFirms: {
      deliveryFirms: {
        deliveryFirms,
        deliveryFirmsPage,
        deliveryFirmsNumberOfPages,
        deliveryFirmsFetchStatus
      }
    },
    deliveryFirmsDispatch
  } = useAppContext();

  useEffect(()=> {
    if (deliveryFirmsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new DeliveryFirmApi(user.api_token);
      api.getList(deliveryFirmsDispatch);
    }
  }, [user, deliveryFirmsFetchStatus, deliveryFirmsDispatch]);

  function refetchDeliveryFirms() {
    if (deliveryFirmsFetchStatus !== FETCH_STATUSES.LOADING) 
      deliveryFirmsDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_delivery.Add_delivery_firm" href="/delivery-firm/add" />

        <InfiniteScroll 
          dataLength={deliveryFirms.length}
          next={refetchDeliveryFirms}
          hasMore={useHasMoreToFetchViaScroll(deliveryFirmsPage, deliveryFirmsNumberOfPages, deliveryFirmsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                deliveryFirms, 
                deliveryFirmsFetchStatus,
                (item, i)=> <DeliveryFirmItem key={`delivery-${i}`} delivery={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchDeliveryFirms} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={deliveryIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchDeliveryFirms} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>

      </div>

    </section>
  );
}
