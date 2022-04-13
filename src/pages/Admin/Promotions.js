
import React, { useEffect } from 'react';
import { promotionIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Forbidden from '../../components/Forbidden';
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
    fetchPromotions, 
    promotions, 
    promotionsLoading, 
    promotionsError, 
    promotionsLoaded, 
    promotionsPage,
    promotionsNumberOfPages,
    refreshPromotions
  ] = usePromotionList();

  useEffect(
    function() {
      if (!promotionsLoaded && promotionsError === null) 
        fetchPromotions();
    }, 
    [promotionsLoaded, promotionsError, fetchPromotions]
  );
  
  return (
    <section>
      <div className="container-x">

        <AddButton href="/promotion/create" text="_promotion.Add_promotion" />
        
        <SingleList
          data={promotions}
          className="list-2-x"
          nextPage={fetchPromotions}
          refreshPage={refreshPromotions}
          hasMore={loadOnScroll(promotionsPage, promotionsNumberOfPages, promotionsError)}
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
                    <FetchMoreButton action={fetchPromotions} /> 
                  </li> 
                );
              }
            },
            {
              canRender: promotionsError === NetworkErrorCodes.UNKNOWN_ERROR,
              render() { 
                return (
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <Reload action={fetchPromotions} /> 
                  </li> 
                );
              },
            },
            {
              canRender: promotionsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
              render() { 
                return (
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <Reload message="_errors.No_netowrk_connection" action={fetchPromotions} /> 
                  </li> 
                );
              },
            },
            {
              canRender: promotionsError === NetworkErrorCodes.FORBIDDEN,
              render() {
                return (
                  <li key="promotions-footer" className="list-2-x-col-span">
                    <Forbidden />
                  </li>
                );
              }
            },
            {
              canRender: promotionsLoaded && promotions.length === 0,
              render() { 
                return (
                  <li key="promotion-footer" className="list-2-x-col-span"> 
                    <EmptyList text="_empty.No_promotion" icon={promotionIcon} /> 
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
