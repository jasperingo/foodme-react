
import { useMemo, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import ProductVariantRepository from "../../repositories/ProductVariantRepository";
import { useAppContext } from "../contextHook";
import { useProductVariantValidation } from "./productVariantValidationHook";

export function useProductVariantCreate(product_id) {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    product: {
      productDispatch
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [priceError, setPriceError] = useState('');

  const [quantityError, setQuantityError] = useState('');

  const [weightError, setWeightError] = useState('');

  const [availableError, setAvailableError] = useState('');

  const validator = useProductVariantValidation();

  const api = useMemo(function() { return new ProductVariantRepository(storeToken); }, [storeToken]);

  async function onSubmit(name, price, quantity, weight, available, validity) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      nameError, 
      priceError, 
      quantityError, 
      weightError,
      availableError
    ] = validator(validity);
    
    setNameError(nameError);
    setPriceError(priceError);
    setQuantityError(quantityError);
    setWeightError(weightError);
    setAvailableError(availableError);
    
    if (error) return;

    setLoading(true);

    try {
      
      const res = await api.create({ name, price, quantity, weight, available, product_id });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);

        productDispatch({
          type: PRODUCT.VARIANT_CREATED,
          payload: { productVariant: res.body.data }
        });
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
              break;

            case 'price':
              setPriceError(error.message);
              break;

            case 'quantity':
              setQuantityError(error.message);
              break;

            case 'weight':
              setWeightError(error.message);
              break;

            case 'available':
              setAvailableError(error.message);
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
    formError, 
    formSuccess, 
    nameError,
    priceError,
    quantityError,
    weightError,
    availableError
  ];
}
