
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoreApp from '../../apps/StoreApp';
import Loading from '../../components/Loading';
import PromotionView from '../../components/PromotionView';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, PROMOTION } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

const getFetchStatusAction = (payload) => ({
  type: PROMOTION.FETCH_STATUS_CHANGED,
  payload
});

export default function Promotion() {

  const ID = parseInt(useParams().ID);

  const {promotions: {
    promotion: {
      promotion,
      promotionFetchStatus
    }
  }, promotionsDispatch} = useAppContext();

  useEffect(()=>{

    async function fetchPromotion() {

      if (promotionFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}promotion.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        data.data.id = ID;
        
        promotionsDispatch({
          type: PROMOTION.FETCHED,
          payload: data.data
        });

      } catch (err) {
        promotionsDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    if (promotion !== null && ID !== promotion.id) {
      promotionsDispatch({ type: PROMOTION.UNFETCH });
    }

    fetchPromotion();

  }, [ID, promotion, promotionFetchStatus, promotionsDispatch]);

  function refetchPromotion() {
    if (promotionFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    promotionsDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      { 
        useDataRender(
          promotion, 
          promotionFetchStatus,
          ()=> <PromotionView promotion={promotion} appType={StoreApp.TYPE} />,
          (k)=> <div className="container-x"> <Loading /> </div>, 
          (k)=> <div className="container-x"> <Reload action={refetchPromotion} /> </div>,
        )
      }
    </section>
  );
}
