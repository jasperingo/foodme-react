
import React, { useEffect } from 'react';
import AddressApi from '../../api/AddressApi';
import AddButton from '../../components/AddButton';
import AddressItem from '../../components/AddressItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getUserAddressListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useListRender } from '../../context/AppHooks';

export default function Addresses() {

  const { user: {
    user,
    addresses: {
      addresses,
      addressesFetchStatus
    }
  }, userDispatch } = useAppContext();

  useEffect(()=> {

    if (addressesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new AddressApi(user.api_token);
      api.getList(userDispatch);
    }

  }, [user, addressesFetchStatus, userDispatch]);

  function refetchAddresses() {
    if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
      userDispatch(getUserAddressListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <AddButton text="_user.Add_address" href="/account/address/add" />
        

        <ul className="list-2-x">
          { 
            useListRender(
              addresses, 
              addressesFetchStatus,
              (item, i)=> <AddressItem key={`addresses-${i}`} address={item} />,
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchAddresses} /> </li>,
            )
          }
        </ul>

      </div>

    </section>
  );
}
