import { useEffect, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountRepository from "../../repositories/DiscountRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDiscountDelete() {

  const {
    store: { 
      store: {
        storeToken
      }
    },
    discount: {
      discountDispatch,
      discount: {
        discount
      }
    }
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
        const api = new DiscountRepository(storeToken);

        api.delete(discount.id)
        .then(res=> {

          if (res.status === 200) {

            setFormSuccess(res.body.message);
            discountDispatch({ type: DISCOUNT.UNFETCHED });

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
    [discount, storeToken, fetchStatus, dialog, discountDispatch]
  )


  return [onSubmit, dialog, formSuccess, formError];
}
