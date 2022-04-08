
import React, { useEffect, useCallback } from 'react';
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
    fetchCustomerAddresses, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
    refreshCustomerAddresses
  ] = useCustomerAddressList(customer.id, customerToken);

  const addressesFetch = useCallback(
    function() {
      if (!addressesLoading) 
        fetchCustomerAddresses();
    },
    [addressesLoading, fetchCustomerAddresses]
  );

  useEffect(
    function() {
      if (!addressesLoaded) addressesFetch();
    }, 
    [addressesLoaded, addressesFetch]
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
        fetchAddresses={addressesFetch}
        refreshList={refreshCustomerAddresses}
        canEdit={true}
        />

    </section>
  );
}
