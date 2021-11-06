
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import PromotionItem from '../../components/PromotionItem';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, PROMOTION } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';
import DiscountIcon from '../../icons/DiscountIcon';

const getPromotionsFetchStatusAction = (payload) => ({
  type: PROMOTION.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function Promotions() {

  const { store: {
    promotions: {
      promotions,
      promotionsPage,
      promotionsNumberOfPages,
      promotionsFetchStatus
    }
  }, storeDispatch } = useAppContext();


  useEffect(()=> {

    async function fetchPromotions() {
      if (promotionsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}promotions.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        storeDispatch({
          type: PROMOTION.LIST_FETCHED,
          payload: {
            promotions: data.data,
            promotionsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        storeDispatch(getPromotionsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchPromotions();

  }, [promotionsFetchStatus, storeDispatch]);

  function refetchPromotions() {
    if (promotionsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    storeDispatch(getPromotionsFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_discount.Add_promotion" href="/promotions" />
      
        <InfiniteScroll 
          dataLength={promotions.length}
          next={refetchPromotions}
          hasMore={useHasMoreToFetchViaScroll(promotionsPage, promotionsNumberOfPages, promotionsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                promotions, 
                promotionsFetchStatus,
                (item, i)=> <PromotionItem key={`prod-${i}`} promotion={item} href={`/promotion/${item.id}`} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchPromotions} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" Icon={DiscountIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchPromotions} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>

      </div>
      
    </section>
  );
}

