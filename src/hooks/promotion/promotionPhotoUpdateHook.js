import { useState, useMemo } from 'react';
import PromotionRepository from '../../repositories/PromotionRepository';
import { useAppContext } from '../contextHook';

export function usePromotionPhotoUpdate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  
  const [photo, setPhoto] = useState(null);
  
  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  const form = useMemo(function() { return new FormData(); }, []);

  const api = useMemo(function() { return new PromotionRepository(adminToken, null); }, [adminToken]);

  async function submit(id) {

    if (loading || photo === null) return;

    setLoading(true);

    form.append('photo', photo);
    
    try {
    
      const res = await api.updatePhoto(id, form);

      if (res.status === 200) {

        setPhotoUploaded(true);

      } else if (res.status === 400) {

        const error = res.body.data[0];
        if (error.name === 'photo') 
          setFormError(error.message);

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
    submit,
    photo,
    setPhoto,
    loading,
    photoUploaded,
    formError
  ];
}
