import { useCallback, useMemo } from "react";
import { useAppContext } from "./contextHook";
import BankRepository from '../repositories/BankRepository';
import { BANK } from "../context/actions/bankActions";
import NetworkErrorCodes from "../errors/NetworkErrorCodes";

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
        banks,
        banksLoading,
        banksLoaded,
        banksError,
      } 
    } 
  } = useAppContext();

  const api = useMemo(function() { return new BankRepository(); }, []);

  const fetchBanks = useCallback(
    async function() {

      if (banksLoading) return;

      if (!window.navigator.onLine) {
        bankDispatch({
          type: BANK.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      bankDispatch({ type: BANK.LIST_FETCHING });

      try {

        const res = await api.getList();

        if (res.status === 200) {
          bankDispatch({
            type: BANK.LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
      } catch(error) {
        bankDispatch({
          type: BANK.LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, banksLoading, bankDispatch]
  );

  return [
    fetchBanks, 
    banks,  
    banksLoading,
    banksLoaded,
    banksError
  ];
}
