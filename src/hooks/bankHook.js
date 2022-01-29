import { useCallback, useEffect } from "react";
import { FETCH_STATUSES } from "../repositories/Fetch";
import { useAppContext } from "./contextHook";
import BankRepository from '../repositories/BankRepository';
import { BANK, getBanksListFetchStatusAction } from "../context/actions/bankActions";


export function useWithdrawalAccountValidation() {

  return function(codeValidity, nameValidity, numberValidity, typeValidity) {
    
    let error = false;
    let codeError = '';
    let nameError = '';
    let numberError = '';
    let typeError = '';
    
    if (!codeValidity.valid) {
      error = true;
      codeError = '_errors.This_field_is_required';
    }

    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }

    if (!numberValidity.valid) {
      error = true;
      numberError = '_errors.This_field_is_required';
    }

    if (!typeValidity.valid) {
      error = true;
      typeError = '_errors.This_field_is_required';
    }

    return [error, codeError, nameError, numberError, typeError];
  }
}

export function useBankList() {

  const { 
    bank: { 
      bankDispatch,
      bank: {
        banks: {
          banks,
          banksFetchStatus
        }
      } 
    } 
  } = useAppContext();

  const retry = useCallback(
    () => {
      bankDispatch(getBanksListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [bankDispatch]
  );

  useEffect(
    ()=> {

      if (banksFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        bankDispatch(getBanksListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (banksFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new BankRepository();
        api.getList()
        .then(res=> {

          if (res.status === 200) {
            bankDispatch({
              type: BANK.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          bankDispatch(getBanksListFetchStatusAction(FETCH_STATUSES.ERROR));
        })
      }
    },
    [banksFetchStatus, bankDispatch]
  );


  return [banks, banksFetchStatus, retry];
}


