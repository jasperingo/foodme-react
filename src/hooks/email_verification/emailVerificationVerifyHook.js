
import { useMemo, useState } from 'react';
import EamilVerificationRepository from '../../repositories/EmailVerificationRepository';
import { useAppContext } from '../contextHook';

export function useEmailVerificationVerify() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  const api = useMemo(function() { return new EamilVerificationRepository(adminToken); }, [adminToken]);

  async function onSubmit(token) {
    
    if (loading) return;

    setLoaded(true);
        
    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setError(null);
    setSuccess(null);

    if (token === null || token === undefined) {
      setError('Token is invalid');
      return;
    }

    setLoading(true);

    try {

      const res = await api.verify(token);

      if (res.status === 200) {
        
        setSuccess(res.body.message);
        
      } else if (res.status === 400) {
        
        const err = res.body.data[0];

        if (err.name === 'token') {
          setError('_errors.This_token_is_invalid');
        } else {
          setError(err.message);
        }
          
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
    error,
    loaded
  ];
}
