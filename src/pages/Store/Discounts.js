
import React, { useEffect } from 'react';
import AddButton from '../../components/AddButton';
import DiscountList from '../../components/list/DiscountList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreDiscountList } from '../../hooks/store/storeDiscountListHook';

export default function Discounts() {

  const {
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Discounts`,
    topNavPaths: ['/messages', '/cart']
  });

  const [
    fetchStoreDiscounts,
    discounts, 
    discountsLoading,
    discountsLoaded,
    discountsError,
    discountsPage, 
    discountsNumberOfPages,
  ] = useStoreDiscountList(storeToken);
  
  useEffect(
    function() {
      if (!discountsLoaded && discountsError === null) 
        fetchStoreDiscounts(store.id); 
    },
    [store.id, discountsError, discountsLoaded, fetchStoreDiscounts]
  );
  
  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_discount.Add_discount" href="/discount/create" />
      
      </div>
      
      <DiscountList
        discounts={discounts}
        discountsPage={discountsPage}
        discountsError={discountsError}
        discountsLoaded={discountsLoaded}
        discountsLoading={discountsLoading}
        discountsNumberOfPages={discountsNumberOfPages}
        fetchDiscounts={()=> fetchStoreDiscounts(store.id)}
        />
        
    </section>
  );
}

