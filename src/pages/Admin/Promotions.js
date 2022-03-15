
import React, { useEffect } from 'react';
import { promotionIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import SingleList from '../../components/list/SingleList';
import PromotionItem from '../../components/list_item/PromotionItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useHeader } from '../../hooks/headerHook';
import { usePromotionList } from '../../hooks/promotion/promotionListHook';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';

export default function Promotions() {

  useHeader({ 
    title: 'Promotions - DailyNeeds',
    headerTitle: "_promotion.Promotions"
  });

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  const [
    fetch, 
    promotions, 
    promotionsLoading, 
    promotionsError, 
    promotionsLoaded, 
    promotionsPage,
    promotionsNumberOfPages,
    retryFetch
  ] = usePromotionList();

  useEffect(
    function() {
      if (!promotionsLoaded) fetch();
    }, 
    [promotionsLoaded, fetch]
  );
  
  return (
    <section>
      <div className="container-x">

        <AddButton href="/promotion/create" text="_promotion.Add_promotion" />
        
        <SingleList
          data={promotions}
          nextPage={fetch}
          hasMore={loadOnScroll(promotionsPage, promotionsNumberOfPages, promotionsError)}
          className="list-2-x"
          renderDataItem={(item)=> (
            <PromotionItem key={`promotion-${item.id}`} item={item} />
          )}
          footer={listFooter([
            {
              canRender: promotionsLoading,
              render() { 
                return ( 
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <Loading /> 
                  </li> 
                ); 
              },
            },
            {
              canRender: promotionsPage <= promotionsNumberOfPages,
              render() {
                return (
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <FetchMoreButton action={fetch} /> 
                  </li> 
                );
              }
            },
            {
              canRender: promotionsError === NetworkErrorCodes.UNKNOWN_ERROR,
              render() { 
                return (
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <Reload action={retryFetch} /> 
                  </li> 
                );
              },
            },
            {
              canRender: promotionsLoaded && promotions.length === 0,
              render() { 
                return (
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <EmptyList text="_empty.No_product" icon={promotionIcon} /> 
                  </li> 
                );
              }
            }
          ])}
          />
      </div>
    </section>
  );
}
