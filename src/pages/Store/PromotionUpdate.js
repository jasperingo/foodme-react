
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PromotionApi from '../../api/PromotionApi';
import Loading from '../../components/Loading';
import PromotionForm from '../../components/PromotionForm';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getPromotionsListFetchStatusAction, PROMOTION } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function PromotionUpdate() {

  const pID = parseInt(useParams().ID);

  const { promotions: {
    promotion: {
      promotion,
      promotionFetchStatus
    }
  }, promotionsDispatch } = useAppContext();

  useEffect(()=> {

    if (promotion !== null && pID !== promotion.id) {
      promotionsDispatch({ type: PROMOTION.UNFETCH });
    } else if (promotion !== null && promotionFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new PromotionApi();
      api.get(pID, promotionsDispatch);
    }

  }, [pID, promotion, promotionFetchStatus, promotionsDispatch]);

  function refetchPromotion() {
    if (promotionFetchStatus !== FETCH_STATUSES.LOADING) 
      promotionsDispatch(getPromotionsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
     <div className="container-x">
        { 
          useDataRender(
            promotion, 
            promotionFetchStatus,
            ()=> <PromotionForm type={PromotionForm.UPDATE} promotion={promotion} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchPromotion} />,
          )
        }
      </div>
    </section>
  );
}
