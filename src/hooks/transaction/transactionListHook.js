import { useCallback, useMemo } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";

export function useTransactionList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    transaction: { 
      transactionDispatch,
      transaction: {
        transactions,
        transactionsPage,
        transactionsError,
        transactionsLoaded,
        transactionsLoading,
        transactionsNumberOfPages
      } 
    }, 
  } = useAppContext();

  const api = useMemo(function() { return new TransactionRepository(adminToken); }, [adminToken]);

  function refreshTransactions() {
    transactionDispatch({ type: TRANSACTION.LIST_UNFETCHED });
  }

  const fetchTransactions = useCallback(
    async function(type) {

      if (transactionsLoading) return;

      if (!window.navigator.onLine) {
        transactionDispatch({
          type: TRANSACTION.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      transactionDispatch({ type: TRANSACTION.LIST_FETCHING });

      try {
        
        const res = await api.getList(transactionsPage, type);
          
        if (res.status === 200) {

          transactionDispatch({
            type: TRANSACTION.LIST_FETCHED, 
            payload: {
              list: res.body.data, 
              numberOfPages: res.body.pagination.number_of_pages
            }
          });

        } else {
          throw new Error();
        }

      } catch {
        transactionDispatch({
          type: TRANSACTION.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [
      api,
      transactionsPage, 
      transactionsLoading, 
      transactionDispatch
    ]
  );

  return [
    fetchTransactions,
    transactions,  
    transactionsLoading,
    transactionsLoaded,
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages,
    refreshTransactions
  ];
}
