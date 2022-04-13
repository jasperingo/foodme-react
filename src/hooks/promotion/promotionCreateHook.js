import { useState, useMemo } from 'react';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';
import { usePromotionValidation } from './promotionValidationHook';

export function usePromotionCreate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const validator = usePromotionValidation();

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [linkError, setLinkError] = useState('');

  const [linkTypeError, setLinkTypeError] = useState('');

  const [amountError, setAmountError] = useState('');

  const [durationError, setDurationError] = useState('');

  const api = useMemo(function() { return new PromotionRepository(adminToken); }, [adminToken]);
  
  async function onSubmit(title, link, linkType, amount, duration, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);

    const [
      error, 
      titleError, 
      linkError, 
      linkTypeError, 
      amountError, 
      durationError
    ] = validator(validity);

    setTitleError(titleError);
    setLinkError(linkError);
    setLinkTypeError(linkTypeError);
    setAmountError(amountError);
    setDurationError(durationError);

    if (error) return;

    setLoading(true);

    try {
      
      const res = await api.create({ 
        title,
        link,
        amount,
        duration,
        link_type: linkType,
      });

      if (res.status === 201) {
        
        setId(res.body.data.id);
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setTitleError(error.message);
              break;

            case 'link':
              setLinkError(error.message);
              break;

            case 'link_type':
              setLinkTypeError(error.message);
              break;

            case 'amount':
              setAmountError(error.message);
              break;

            case 'duration':
              setDurationError(error.message);
              break;

            default:
              setFormError(error.message);
          }
        }

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
    id, 
    loading, 
    formError,
    titleError, 
    linkError, 
    linkTypeError,
    amountError,
    durationError
  ];
}
