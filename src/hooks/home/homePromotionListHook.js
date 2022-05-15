import { useMemo, useCallback } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';

const base = {
  photo: { href: '/photos/about-resturant.jpg' },
  title: 'Welcome to DailyNeeds',
  link: '/contact-us',
  call_to_action: 'Contact us on our website',
}

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
          res.body.data.unshift(base);
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
