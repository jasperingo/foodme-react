
import React, { useEffect } from 'react';
import AddressApi from '../../api/AddressApi';
import CustomerApp from '../../apps/CustomerApp';
import { locationIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import AddressItem from '../../components/AddressItem';
import EmptyList from '../../components/EmptyList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getAddressesListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useListRender } from '../../context/AppHooks';

export default function Addresses() {

  const { 
    user: { user },
    addresses: {
      addresses: {
        addresses,
        addressesFetchStatus,
      }
    }, 
    addressesDispatch 
  } = useAppContext();

  useEffect(()=> {

    if (addressesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new AddressApi(user.api_token);
      api.getListByCustomer(user.id, addressesDispatch);
    }

  });

  function refetchAddresses() {
    if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
      addressesDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <AddButton text="_user.Add_address" href="/address/add" />
        
        <ul className="list-2-x">
          { 
            useListRender(
              addresses, 
              addressesFetchStatus,
              (item, i)=> <AddressItem key={`addresses-${i}`} address={item} appType={CustomerApp.TYPE} />,
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchAddresses} /> </li>,
              (k)=> <li key={k} className="col-span-2"> <EmptyList text="_empty.No_address" icon={locationIcon} /> </li> 
            )
          }
        </ul>

      </div>

    </section>
  );
}
