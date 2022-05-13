import { useMemo, useState } from "react";
import CategoryRepository from "../../repositories/CategoryRepository";
import { useAppContext } from "../contextHook";
import { useCategoryValidation } from "./categoryValidationHook";

export function useCategoryCreate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [nameError, setNameError] = useState('');

  const [typeError, setTypeError] = useState('');

  const [hideProductsError, setHideProductsError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const validator = useCategoryValidation();

  const api = useMemo(function() { return new CategoryRepository(adminToken); }, [adminToken]);

  async function onSubmit(name, type, hide_products, description, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    
    const [
      error, 
      nameError, 
      typeError, 
      hideProductsError, 
      descriptionError
    ] = validator(validity);
    
    setNameError(nameError);
    setTypeError(typeError);
    setHideProductsError(hideProductsError);
    setDescriptionError(descriptionError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.create({ name, type, hide_products, description });

      if (res.status === 201) {
        
        setId(res.body.data.id);
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
              break;

            case 'type':
              setTypeError(error.message);
              break;

            case 'hide_products':
              setHideProductsError(error.message);
              break;

            case 'description':
              setDescriptionError(error.message);
              break;

            default:
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
    nameError, 
    typeError, 
    hideProductsError,
    descriptionError
  ];
}
