import { useMemo, useCallback } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';

export function useHomePromotionList() {

  const { 
    home: { 
      homeDispatch,
      home: {
        promotions,
        promotionsError,
        promotionsLoaded,
        promotionsLoading,
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new PromotionRepository(); }, []);
  
  const fetchPromotions = useCallback(
    async function() {
      
      if (promotionsLoading) return;

      if (!window.navigator.onLine) {
        homeDispatch({
          type: PROMOTION.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      homeDispatch({ type: PROMOTION.LIST_FETCHING });

      try {
        
        const res = await api.getRandomList();

        if (res.status === 200) {
          homeDispatch({
            type: PROMOTION.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
        
      } catch {
        homeDispatch({
          type: PROMOTION.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, promotionsLoading, homeDispatch]
  );

  return [fetchPromotions, promotions, promotionsLoading, promotionsError, promotionsLoaded];
}
