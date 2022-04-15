import { useMemo, useState } from 'react';
import EamilVerificationRepository from '../../repositories/EmailVerificationRepository';
import { useAppContext } from '../contextHook';

export function useEmailVerificationSend() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new EamilVerificationRepository(adminToken); }, [adminToken]);

  async function onSubmit(email) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    setLoading(true);

    try {

      const res = await api.send({ email });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);
        
      } else if (res.status === 400) {
        
        setFormError(res.body.data[0].message);
          
      } else {
        throw new Error();
      }
      
    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit,  
    loading, 
    formSuccess,
    formError
  ];
}
