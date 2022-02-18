
import { useEffect, useState } from "react";
import { DELIVERY_ROUTE } from "../../context/actions/deliveryRouteActions";
import DeliveryRouteWeightRepository from "../../repositories/DeliveryRouteWeightRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useDeliveryRouteWeightValidation } from "./deliveryRouteWeightValidationHook";

export function useDeliveryRouteWeightUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    },
    deliveryRoute : { 
      deliveryRouteDispatch,
      deliveryRoute: {
        deliveryWeight
      } 
    }
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [minError, setMinError] = useState('');

  const [maxError, setMaxError] = useState('');

  const [feeError, setFeeError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const validator = useDeliveryRouteWeightValidation();

  function onSubmit(
    minimium,
    maximium,
    fee,

    minValidity,
    maxValidity,
    feeValidity
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      minError, 
      maxError, 
      feeError, 
    ] = validator(minimium, maximium, minValidity, maxValidity, feeValidity);

    setMinError(minError);
    setMaxError(maxError);
    setFeeError(feeError);

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ minimium, maximium, fee });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DeliveryRouteWeightRepository(deliveryFirmToken);

        api.update(deliveryWeight.id, data)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);

            setFetchStatus(FETCH_STATUSES.PENDING);

            deliveryRouteDispatch({
              type: DELIVERY_ROUTE.WEIGHT_UPDATED,
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

                case 'fee':
                  setFeeError(error.message);
                  break;

                case 'delivery_route_id':
                  setFormError(error.message);
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
    [fetchStatus, dialog, deliveryFirmToken, data, deliveryWeight, deliveryRouteDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    feeError
  ];
}

