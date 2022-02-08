
import React from 'react';
import AddButton from '../../components/AddButton';
import DiscountList from '../../components/profile/section/DiscountList';
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
    discounts, 
    discountsFetchStatus, 
    discountsPage, 
    discountsNumberOfPages, 
    refetch
  ] = useStoreDiscountList(storeToken);
  
  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_discount.Add_discount" href="/discount/create" />
      
      </div>
      
      <DiscountList
        discounts={discounts}
        discountsFetchStatus={discountsFetchStatus}
        discountsPage={discountsPage}
        discountsNumberOfPages={discountsNumberOfPages}
        refetch={refetch}
        />
      
    </section>
  );
}

