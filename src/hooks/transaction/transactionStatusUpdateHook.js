
import { useMemo, useState, useCallback } from "react";
import { TRANSACTION } from "../../context/actions/transactionActions";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useAppContext } from "../contextHook";

export function useTransactionStatusUpdate(userToken) {

  const { 
    transaction: { 
      transactionDispatch,
      transaction: {
        transaction
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new TransactionRepository(userToken); }, [userToken]);

  const resetSubmit = useCallback(
    function() {
      setFormError(null);
      setFormSuccess(null);
    },
    []
  );

  async function onSubmit(status) {
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    setLoading(true);

    try {

      const res = await api.updateStatus(transaction.id, { status });

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);
        
        transactionDispatch({
          type: TRANSACTION.FETCHED, 
          payload: { 
            id: String(transaction.id),
            transaction: res.body.data 
          }
        });
        
      } else if (res.status === 400) {

        setFormError(res.body.data[0].message);

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
    resetSubmit
  ];
}
