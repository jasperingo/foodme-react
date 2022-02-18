
import { useEffect, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductVariantRepository from "../../repositories/ProductVariantRepository";
import { useAppContext } from "../contextHook";
import { useURLQuery } from "../viewHook";

export function useProductVariantCreate() {

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

  const product = useURLQuery().get('product');

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [priceError, setPriceError] = useState('');

  const [quantityError, setQuantityError] = useState('');

  const [weightError, setWeightError] = useState('');

  const [availableError, setAvailableError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    name,
    price,
    quantity,
    weight,
    available,
    nameValidity,
    priceValidity,
    quantityValidity,
    weightValidity,
    availableValidity
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;
    
    if (!nameValidity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!quantityValidity.valid) {
      error = true;
      setQuantityError('_errors.This_field_is_required');
    } else {
      setQuantityError('');
    }
    
    if (!priceValidity.valid) {
      error = true;
      setPriceError('_errors.This_field_is_required');
    } else {
      setPriceError('');
    }

    if (!weightValidity.valid) {
      error = true;
      setWeightError('_errors.This_field_is_required');
    } else {
      setWeightError('');
    }

    if (!availableValidity.valid) {
      error = true;
      setAvailableError('_errors.This_field_is_required');
    } else {
      setAvailableError('');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ name, price, quantity, weight, available, product_id: product });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ProductVariantRepository(storeToken);

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);

            productDispatch({
              type: PRODUCT.VARIANT_CREATED,
              payload: res.body.data
            });
            
            setFetchStatus(FETCH_STATUSES.PENDING);
            
          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
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
          
        })
        .catch(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
          setFormError('_errors.Something_went_wrong');
        });

      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, storeToken, data, productDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    nameError,
    priceError,
    quantityError,
    weightError,
    availableError
  ];
}
