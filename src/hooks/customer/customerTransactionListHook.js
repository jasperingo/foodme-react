import { useCallback, useMemo } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CustomerRepository from "../../repositories/CustomerRepository";
import { useAppContext } from "../contextHook";

export function useCustomerTransactionList(userId, userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        transactions: {
          transactions,
          transactionsPage,
          transactionsError,
          transactionsLoaded,
          transactionsLoading,
          transactionsNumberOfPages
        } 
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CustomerRepository(userToken); }, [userToken]);

  function setCustomerTransactionsError(error) {
    dispatch({ 
      type: TRANSACTION.LIST_ERROR_CHANGED, 
      payload: { error } 
    });
  }

  function refreshCustomerTransactions() {
    dispatch({ type: TRANSACTION.LIST_UNFETCHED });
  }

  const fetchCustomerTransactions = useCallback(
    async function() {

      dispatch({ type: TRANSACTION.LIST_FETCHING });

      try {
        
        const res = await api.getTransactionsList(userId, transactionsPage);

        if (res.status === 200) {
          dispatch({
            type: TRANSACTION.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });
        } else if (res.status === 401) {
          throw new NetworkError(NetworkErrorCodes.UNAUTHORIZED);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }
        
      } catch(error) {
        dispatch({
          type: TRANSACTION.LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [userId, transactionsPage, api, dispatch]
  );

  return [
    fetchCustomerTransactions, 
    transactions, 
    transactionsLoading, 
    transactionsLoaded, 
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages, 
    setCustomerTransactionsError, 
    refreshCustomerTransactions
  ];
}
