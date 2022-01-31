
import React from 'react';
import { discountIcon } from '../../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import FetchMoreButton from '../../FetchMoreButton';
import Forbidden from '../../Forbidden';
import ScrollList from '../../list/ScrollList';
import DiscountItem from '../../list_item/DiscountItem';
import Loading from '../../Loading';
import NotFound from '../../NotFound';
import Reload from '../../Reload';

export default function DiscountList({ discounts, discountsFetchStatus, discountsPage, discountsNumberOfPages, refetch }) {
  
  return (
    <div>
      <div className="container-x">

        <ScrollList
          data={discounts}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(discountsPage, discountsNumberOfPages, discountsFetchStatus)}
          className="list-x"
          renderDataItem={(item)=> (
            <DiscountItem key={`discount-${item.id}`} discount={item} />
          )}
          footer={useRenderListFooter(
            discountsFetchStatus,
            ()=> <li key="discount-footer"> <Loading /> </li>, 
            ()=> <li key="discount-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="discount-footer"> <EmptyList text="_empty.No_discount" icon={discountIcon} /> </li>,
            ()=> <li key="discount-footer"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="discount-footer"> <NotFound /> </li>,
            ()=> <li key="discount-footer"> <Forbidden /> </li>,
          )}
          />

      </div>
    </div>
  );
}

