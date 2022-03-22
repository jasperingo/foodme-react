
import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AddButton from '../../components/AddButton';
import AddressList from '../../components/list/AddressList';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerAddressList } from '../../hooks/customer/customerAddressListHook';
import { useHeader } from '../../hooks/headerHook';

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

  const [
    fetch, 
    addresses, 
    addressesLoading, 
    addressesError, 
    addressesLoaded, 
    retryFetch,
    refresh
  ] = useCustomerAddressList(customer.id, customerToken);

  const history = useHistory();

  useEffect(
    function() {
      if (!addressesLoaded && cartItems.length > 0) fetch();
    }, 
    [addressesLoaded, fetch, cartItems.length]
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
        addresses={addresses}
        addressesLoading={addressesLoading}
        addressesError={addressesError}
        addressesLoaded={addressesLoaded}
        refetch={retryFetch}
        refresh={refresh}
        renderButtons={true}
        onButtonClicked={onSelect}
        />

    </section>
  );
}
