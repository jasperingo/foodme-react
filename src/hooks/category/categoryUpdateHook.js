
import { useMemo, useState } from "react";
import { CATEGORY } from "../../context/actions/categoryActions";
import CategoryRepository from "../../repositories/CategoryRepository";
import { useAppContext } from "../contextHook";
import { useCategoryValidation } from "./categoryValidationHook";

export function useCategoryUpdate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    category: { 
      categoryDispatch,
      category: {
        category
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');
  
  const [hideProductsError, setHideProductsError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const validator = useCategoryValidation();

  const api = useMemo(function() { return new CategoryRepository(adminToken); }, [adminToken]);

  async function onSubmit(name, hide_products, description, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    
    const [error, nameError, , hideProductsError, descriptionError] = validator(validity);
    
    setNameError(nameError);
    setHideProductsError(hideProductsError)
    setDescriptionError(descriptionError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(category.id, { name, hide_products, description });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);
        
        categoryDispatch({
          type: CATEGORY.FETCHED, 
          payload: {
            id: String(category.id),
            category: res.body.data, 
          }
        });

        setSuccess(true);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
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
    loading, 
    success, 
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    hideProductsError,
    descriptionError
  ];
}
