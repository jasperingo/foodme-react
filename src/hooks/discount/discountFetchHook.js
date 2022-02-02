import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DISCOUNT, getDiscountFetchStatusAction } from "../../context/actions/discountActions";
import DiscountRepository from "../../repositories/DiscountRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useDiscountFetch(userToken) {

  const { ID } = useParams();

  const { 
    discount: {
      discountDispatch,
      discount: {
        discount,
        discountID,
        discountLoading,
        discountFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (discountFetchStatus !== FETCH_STATUSES.LOADING && discountFetchStatus !== FETCH_STATUSES.DONE)
        discountDispatch(getDiscountFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, discountFetchStatus, discountDispatch]
  );
  
  useEffect(
    ()=> {

      if (discountID !== null && discountID !== Number(ID)) {

        discountDispatch({ type: DISCOUNT.UNFETCHED });

      } else if (discountLoading && discountFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        discountDispatch(getDiscountFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (discountLoading && discountFetchStatus === FETCH_STATUSES.LOADING) {

        discountDispatch(getDiscountFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new DiscountRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            discountDispatch({
              type: DISCOUNT.FETCHED, 
              payload: {
                discount: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {

            discountDispatch(getDiscountFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));

          } else if (res.status === 403) {

            discountDispatch(getDiscountFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));

          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          discountDispatch(getDiscountFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );
  
  return [discount, discountFetchStatus, refetch];
}

