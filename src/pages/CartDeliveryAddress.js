
import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AddButton from '../components/AddButton';
import AddressList from '../components/list/AddressList';
import { CART } from '../context/actions/cartActions';
import { useAppContext } from '../hooks/contextHook';
import { useCustomerAddressList } from '../hooks/customer/customerAddressListHook';
import { useHeader } from '../hooks/headerHook';

export default function CartDeliveryAddress() {

  useHeader({ 
    title: `Delivery Address (Cart) - Dailyneeds`,
    headerTitle: '_delivery.Delivery_address',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      cartDispatch,
      cart: {
        cartItems
      } 
    },
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();
  
  const history = useHistory();

  const [
    fetchCustomerAddresses, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
    refreshCustomerAddresses
  ] = useCustomerAddressList(customerToken);

  useEffect(
    function() {
      if (!addressesLoaded && addressesError === null && cartItems.length > 0) 
        fetchCustomerAddresses(customer.id);
    }, 
    [customer.id, addressesLoaded, addressesError, fetchCustomerAddresses, cartItems.length]
  );

  if (cartItems.length === 0) {
    return <Redirect to="/" />
  }
  
  function onSelect(value) {
    cartDispatch({
      type: CART.DELIVERY_ADDRESS_CHOOSEN,
      payload: value
    });
    
    history.push('/cart/delivery-routes');
  }

  return (
    <section>

      <div className="container-x">
        <AddButton text="_user.Add_address" href="/address/add" />
      </div>
      
      <AddressList 
        renderButtons={true}
        onButtonClicked={onSelect}
        addresses={addresses}
        addressesLoading={addressesLoading}
        addressesError={addressesError}
        addressesLoaded={addressesLoaded}
        refreshList={refreshCustomerAddresses}
        fetchAddresses={()=> fetchCustomerAddresses(customer.id)}
        />

    </section>
  );
}
