import { useEffect, useState } from "react";
import { ADDRESS } from "../../context/actions/addressActions";
import AddressRepository from "../../repositories/AddressRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useAddressDelete() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    address: { 
      addressDispatch,
      address: {
        address
      } 
    },
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit() {
    setDialog(true);
    setFormError(null);
    setFormSuccess(null);
    setFetchStatus(FETCH_STATUSES.LOADING);
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        const api = new AddressRepository(customerToken);

        api.delete(address.id)
        .then(res=> {

          if (res.status === 200) {
            setFormSuccess(res.body.message);
            addressDispatch({ type: ADDRESS.UNFETCHED });
          } else if (res.status === 400) {
            setFormError(res.body.data[0].message);
          } else {
            throw new Error();
          }
          
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }
    },
    [address, customerToken, fetchStatus, dialog, addressDispatch]
  )


  return [onSubmit, dialog, formSuccess, formError];
}
