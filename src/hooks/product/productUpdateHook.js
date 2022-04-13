
import { useMemo, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";
import { useProductValidation } from "./productValidationHook";

export function useProductUpdate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    product: { 
      productDispatch,
      product: {
        product
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  
  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const validator = useProductValidation();

  const api = useMemo(function() { return new ProductRepository(storeToken); }, [storeToken]);

  async function onSubmit(title, sub_category_id, description, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [error, titleError, categoryError, descriptionError] = validator(validity);
    
    setTitleError(titleError);
    setCategoryError(categoryError);
    setDescriptionError(descriptionError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(product.id, { title, sub_category_id, description });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);
          
        productDispatch({
          type: PRODUCT.FETCHED, 
          payload: { 
            id: String(product.id),
            product: res.body.data 
          }
        });

        setSuccess(true);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setTitleError(error.message);
              break;

            case 'sub_category_id':
              setCategoryError(error.message);
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
    titleError,
    categoryError, 
    descriptionError
  ];
}
