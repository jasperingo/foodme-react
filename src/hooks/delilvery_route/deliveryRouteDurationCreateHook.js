
import { useEffect, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteDurationRepository from "../../repositories/DeliveryRouteDurationRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useURLQuery } from "../viewHook";

export function useDeliveryRouteDurationCreate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
    }
  } = useAppContext();

  const route = useURLQuery().get('delivery_route');

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [minError, setMinError] = useState('');

  const [maxError, setMaxError] = useState('');

  const [unitError, setUnitError] = useState('');

  const [feeError, setFeeError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    minimium,
    maximium,
    fee,
    unit,

    minValidity,
    maxValidity,
    feeValidity,
    unitValidity
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;
    
    if (!minValidity.valid) {
      error = true;
      setMinError('_errors.This_field_is_required');
    } else {
      setMinError('');
    }

    if (!maxValidity.valid) {
      error = true;
      setMaxError('_errors.This_field_is_required');
    } else {
      setMaxError('');
    }

    if (!feeValidity.valid) {
      error = true;
      setFeeError('_errors.This_field_is_required');
    } else {
      setFeeError('');
    }
    
    if (!unitValidity.valid) {
      error = true;
      setUnitError('_errors.This_field_is_required');
    } else {
      setUnitError('');
    }

    if (!error && Number(minimium) >= Number(maximium)) {
      error = true;
      setMinError('_errors.This_field_is_invalid');
    }

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ minimium, maximium, fee, unit, delivery_route_id: route });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DeliveryRouteDurationRepository(deliveryFirmToken);

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.DURATION_CREATED,
              payload: res.body.data
            });
            
          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'minimium':
                  setMinError(error.message);
                  break;

                case 'maximium':
                  setMaxError(error.message);
                  break;

                case 'unit':
                  setUnitError(error.message);
                  break;

                case 'fee':
                  setFeeError(error.message);
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
    [fetchStatus, dialog, deliveryFirmToken, data, deliveryRouteDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    unitError,
    feeError
  ];
}
