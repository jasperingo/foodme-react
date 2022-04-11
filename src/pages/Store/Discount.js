
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DiscountProfile from '../../components/profile/DiscountProfile';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useDiscountFetch } from '../../hooks/discount/discountFetchHook';
import { useHeader } from '../../hooks/headerHook';

export default function Discount() {

  const { ID } = useParams();

  const {
    store: { 
      store: {
        storeToken
      }
    } 
  } = useAppContext();

  const [
    fetchDiscount,
    discount,
    discountLoading,
    discountError,
    discountID,
    unfetchDiscount
  ] = useDiscountFetch(storeToken);

  useHeader({ 
    title: `${discount?.title ?? 'Loading...'} - Discount`,
    headerTitle: "_discount.Discount"
  });
  
  useEffect(
    function() {
      if ((discount !== null || discountError !== null) && discountID !== ID) 
        unfetchDiscount();
      else if (discount === null && discountError === null)
        fetchDiscount(ID);
    },
    [ID, discount, discountError, discountID, fetchDiscount, unfetchDiscount]
  );

  return (
    <section>
     
      { discount !== null && <DiscountProfile discount={discount} userToken={storeToken} isStore={true} /> }

      { discountLoading && <Loading /> }
      { discountError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
      { discountError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
      { discountError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDiscount(ID)} /> }
      { discountError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDiscount(ID)} /> }
    
    </section>
  );
}
