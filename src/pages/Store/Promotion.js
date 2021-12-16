
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PromotionApi from '../../api/PromotionApi';
import StoreApp from '../../apps/StoreApp';
import Loading from '../../components/Loading';
import PromotionView from '../../components/PromotionView';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getPromotionFetchStatusAction, PROMOTION } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function Promotion() {

  const ID = parseInt(useParams().ID);

  const { promotions: {
    promotion: {
      promotion,
      promotionFetchStatus
    }
  }, promotionsDispatch } = useAppContext();

  useEffect(()=>{

    if (promotion !== null && ID !== promotion.id) {
      promotionsDispatch({ type: PROMOTION.UNFETCH });
    } else if (promotionFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new PromotionApi();
      api.get(ID, promotionsDispatch);
    }

  }, [ID, promotion, promotionFetchStatus, promotionsDispatch]);

  function refetchPromotion() {
    if (promotionFetchStatus !== FETCH_STATUSES.LOADING) 
      promotionsDispatch(getPromotionFetchStatusAction(FETCH_STATUSES.LOADING));
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
