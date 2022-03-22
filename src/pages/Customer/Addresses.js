
import React, { useEffect } from 'react';
import AddButton from '../../components/AddButton';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useCustomerAddressList } from '../../hooks/customer/customerAddressListHook';
import AddressList from '../../components/list/AddressList';

export default function Addresses() {

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${customer.user.name} - Addresses`,
    headerTitle: "_user.Addresses"
  });

  const [
    fetch, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
    retryFetch,
    refresh
  ] = useCustomerAddressList(customer.id, customerToken);

  useEffect(
    function() {
      if (!addressesLoaded) fetch();
    }, 
    [addressesLoaded, fetch]
  );

  return (
    <section>
      
      <div className="container-x">
        <AddButton text="_user.Add_address" href="/address/add" />
      </div>

      <AddressList 
        addresses={addresses}
        addressesLoading={addressesLoading}
        addressesError={addressesError}
        addressesLoaded={addressesLoaded}
        refetch={retryFetch}
        refresh={refresh}
        canEdit={true}
        />

    </section>
  );
}
