
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';
import { locationIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CART } from '../../context/actions/cartActions';
import { useAddressList } from '../../hooks/address/addressListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderListFooter } from '../../hooks/viewHook';

function AddressButton({ address: { id, title, street, city, state, type }, onClick }) {

  const { t } = useTranslation();

  return (
    <li>
      <button className="block w-full border rounded text-left mb-4" onClick={()=> onClick(id)}>
        <div className="p-2 font-bold">{ title }</div>
        <div className="px-2 pb-2">{ street }, { city }, { state }</div>
        <div className={`${type === 'default' ? 'text-color-primary' : 'text-color-gray'} border-t p-2`}>
            { type === 'default' ? t('_user.Default_address') : t('_extra.Not_default') }
        </div>
      </button>
    </li>
  );
}

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
    addresses,
    addressesFetchStatus,
    refetch,
    refresh
  ] = useAddressList(customer, customerToken);

  const history = useHistory();

  const footer = useRenderListFooter(
    addressesFetchStatus,
    ()=> <li key="addresses-footer"> <Loading /> </li>, 
    ()=> <li key="addresses-footer"> <Reload action={refetch} /> </li>,
    ()=> <li key="addresses-footer" className="col-span-2"> <EmptyList text="_empty.No_address" icon={locationIcon} /> </li>
  )

  if (cartItems.length === 0) {
    return <Redirect to="/cart" />
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

        <SingleList
          data={addresses}
          className="list-2-x"
          refreshPage={refresh}
          renderDataItem={(item)=> (
            <AddressButton key={`address-${item.id}`} address={item} onClick={onSelect} />
          )}
          footer={footer}
          />

      </div>

    </section>
  );
}
