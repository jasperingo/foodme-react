
import React, { useEffect } from 'react';
import { promotionIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import PromotionItem from '../../components/list_item/PromotionItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useHeader } from '../../hooks/headerHook';
import { usePromotionList } from '../../hooks/promotion/promotionListHook';
import { useListFooter } from '../../hooks/viewHook';

export default function Promotions() {

  useHeader({ 
    title: 'Promotions - DailyNeeds',
    headerTitle: "_promotion.Promotions"
  });

  const listFooter = useListFooter();

  const [
    fetch, 
    promotions, 
    promotionsLoading, 
    promotionsError, 
    promotionsLoaded, 
    retryFetch
  ] = usePromotionList();

  useEffect(fetch, [fetch]);

  return (
    <section>
      <div className="container-x">

        <AddButton href="/promotion/create" text="_promotion.Add_promotion" />
        
        <SingleList
          data={promotions}
          // nextPage={refetch}
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
