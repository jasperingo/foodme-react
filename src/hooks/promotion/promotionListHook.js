import { useMemo, useCallback } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
import NetworkError from '../../errors/NetworkError';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';

export function usePromotionList() {

  const { 
    promotion: { 
      promotionDispatch,
      promotion: {
        promotions,
        promotionsPage,
        promotionsError,
        promotionsLoaded,
        promotionsLoading,
        promotionsNumberOfPages
      } 
    },
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const api = useMemo(function() { return new PromotionRepository(adminToken); }, [adminToken]);

  function refreshPromotions() {
    promotionDispatch({ type: PROMOTION.LIST_UNFETCHED }); 
  }
  
  const fetchPromotions = useCallback(
    async function() {
      
      if (promotionsLoading) return;

      if (!window.navigator.onLine) {
        promotionDispatch({
          type: PROMOTION.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      promotionDispatch({ type: PROMOTION.LIST_FETCHING });

      try {
        
        const res = await api.getList(promotionsPage);

        if (res.status === 200) {
          promotionDispatch({
            type: PROMOTION.LIST_FETCHED, 
            payload: { 
              list: res.body.data,
              numberOfPages: res.body.pagination.number_of_pages,
            }
          });
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
        
      } catch(error) {
        promotionDispatch({
          type: PROMOTION.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, promotionsPage, promotionsLoading, promotionDispatch]
  );

  return [
    fetchPromotions, 
    promotions, 
    promotionsLoading, 
    promotionsError, 
    promotionsLoaded, 
    promotionsPage,
    promotionsNumberOfPages,
    refreshPromotions
  ];
}
