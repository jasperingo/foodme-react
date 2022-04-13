import { useMemo, useCallback } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
import NetworkError from '../../errors/NetworkError';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';

export function usePromotionFetch() {

  const { 
    promotion: { 
      promotionDispatch,
      promotion: {
        promotion,
        promotionID,
        promotionError,
        promotionLoading
      } 
    },
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const api = useMemo(function() { return new PromotionRepository(adminToken); }, [adminToken]);

  const unfetchPromotion = useCallback(
    function() { promotionDispatch({ type: PROMOTION.UNFETCHED }); },
    [promotionDispatch]
  );
  
  const fetchPromotion = useCallback(
    async function(ID) {

      if (promotionLoading) return;

      if (!window.navigator.onLine) {
        promotionDispatch({
          type: PROMOTION.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      promotionDispatch({ type: PROMOTION.FETCHING });

      try {

        const res = await api.get(ID);

        if (res.status === 200) {
          promotionDispatch({
            type: PROMOTION.FETCHED, 
            payload: { 
              id: ID,
              promotion: res.body.data 
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
        
      } catch(error) {
        promotionDispatch({
          type: PROMOTION.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [promotionLoading, api, promotionDispatch]
  );

  return [
    fetchPromotion,
    promotion,
    promotionLoading,
    promotionError,
    promotionID,
    unfetchPromotion
  ];
}
