
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DiscountProfile from '../../components/profile/DiscountProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDiscountFetch } from '../../hooks/discount/discountFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function Discount() {

  const {
    store: { 
      store: {
        storeToken
      }
    } 
  } = useAppContext();

  const [
    discount, 
    discountFetchStatus, 
    refetch
  ] = useDiscountFetch(storeToken);

  useHeader({ 
    title: `${discount?.title ?? 'Loading...'} - Discount`,
    headerTitle: "_discount.Discount"
  });
  
  return (
    <section>
      {
        useRenderOnDataFetched(
          discountFetchStatus,
          ()=> <DiscountProfile discount={discount} userToken={storeToken} isStore={true} />,
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }
    </section>
  );
}
