import { useMemo, useCallback } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
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
      } 
    },
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const api = useMemo(function() { return new PromotionRepository(adminToken); }, [adminToken]);

  const retryFetch = useCallback(
    function() { 
      promotionDispatch({ 
        type: PROMOTION.LIST_ERROR_CHANGED, 
        payload: { error: null } 
      }) ;
    },
    [promotionDispatch]
  );
  
  const fetch = useCallback(
    async function() {
      
      if (promotionsLoaded || promotionsLoading || promotionsError !== null) return;

      if (!window.navigator.onLine) {
        promotionDispatch({
          type: PROMOTION.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      promotionDispatch({ type: PROMOTION.LIST_FETCHING });

      try {
        
        const res = await api.getList(promotionsPage);

        if (res.status === 200) {
          promotionDispatch({
            type: PROMOTION.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else if (res.status === 401) {
          promotionDispatch({
            type: PROMOTION.LIST_ERROR_CHANGED,
            payload: {
              error: NetworkErrorCodes.UNAUTHORIZED
            }
          });
        } else if (res.status === 403) {
          promotionDispatch({
            type: PROMOTION.LIST_ERROR_CHANGED,
            payload: {
              error: NetworkErrorCodes.FORBIDDEN
            }
          });
        } else {
          throw new Error();
        }
        
      } catch {
        promotionDispatch({
          type: PROMOTION.LIST_ERROR_CHANGED,
          payload: {
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, promotionsLoaded, promotionsPage, promotionsLoading, promotionsError, promotionDispatch]
  );

  return [fetch, promotions, promotionsLoading, promotionsError, promotionsLoaded, retryFetch];
}
