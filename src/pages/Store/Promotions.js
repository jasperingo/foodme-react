
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PromotionApi from '../../api/PromotionApi';
import { promotionIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import PromotionItem from '../../components/PromotionItem';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getPromotionsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function Promotions() {

  const { user: { user }, promotions: {
    promotions: {
      promotions,
      promotionsPage,
      promotionsNumberOfPages,
      promotionsFetchStatus
    }
  }, promotionsDispatch } = useAppContext();

  useEffect(()=> {
    if (promotionsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new PromotionApi(user.api_token);
      api.getListByStore(0, promotionsDispatch);
    }
  }, [user, promotionsFetchStatus, promotionsDispatch]);

  function refetchPromotions() {
    if (promotionsFetchStatus !== FETCH_STATUSES.LOADING) 
      promotionsDispatch(getPromotionsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <AddButton text="_discount.Add_promotion" href="/account/promotion/add" />
      
        <InfiniteScroll 
          dataLength={promotions.length}
          next={refetchPromotions}
          hasMore={useHasMoreToFetchViaScroll(promotionsPage, promotionsNumberOfPages, promotionsFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                promotions, 
                promotionsFetchStatus,
                (item, i)=> <PromotionItem key={`promotion-${i}`} promotion={item} href={`/account/promotion/${item.id}`} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchPromotions} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={promotionIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchPromotions} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>

      </div>
      
    </section>
  );
}

