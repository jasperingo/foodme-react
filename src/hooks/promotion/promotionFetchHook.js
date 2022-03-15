import { useMemo, useCallback } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
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

  const unfetch = useCallback(
    function() {
      promotionDispatch({ type: PROMOTION.UNFETCHED });
    },
    [promotionDispatch]
  );

  const fetch = useCallback(
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
            payload: { promotion: res.body.data }
          });
        } else if (res.status === 404) {
          promotionDispatch({
            type: PROMOTION.ERROR_CHANGED,
            payload: {
              id: ID,
              error: NetworkErrorCodes.NOT_FOUND
            }
          });
        } else if (res.status === 401) {
          promotionDispatch({
            type: PROMOTION.ERROR_CHANGED,
            payload: {
              id: ID,
              error: NetworkErrorCodes.UNAUTHORIZED
            }
          });
        } else if (res.status === 403) {
          promotionDispatch({
            type: PROMOTION.ERROR_CHANGED,
            payload: {
              id: ID,
              error: NetworkErrorCodes.FORBIDDEN
            }
          });
        } else {
          throw new Error();
        }
        
      } catch {
        promotionDispatch({
          type: PROMOTION.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [promotionLoading, api, promotionDispatch]
  );

  return [
    fetch,
    promotion,
    promotionLoading,
    promotionError,
    promotionID,
    unfetch
  ];
}
