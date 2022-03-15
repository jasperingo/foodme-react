import { useState, useMemo } from 'react';
import { PROMOTION } from '../../context/actions/promotionActions';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';

export function usePromotionDelete() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    promotion: { 
      promotionDispatch
    },
  } = useAppContext();

  
  const [error, setError] = useState(null);
  
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const api = useMemo(function() { return new PromotionRepository(adminToken); }, [adminToken]);

  async function onSubmit(id) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setLoading(true);

    try {
      
      const res = await api.delete(id);

      if (res.status === 200) {
        
        setSuccess(true);
        promotionDispatch({ type: PROMOTION.DELETED, payload: { id } });
        
      } else {
        throw new Error();
      }

    } catch {
      setError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
    
  }

  return [
    onSubmit,
    loading, 
    success,
    error
  ];
}
