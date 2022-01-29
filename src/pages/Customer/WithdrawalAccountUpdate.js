
import React from 'react';
import UpdateWithdrawalAccountForm from '../../components/form/WithdrawalAccountUpdateForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useBankList } from '../../hooks/bankHook';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerWithdrawalAccountUpdate } from '../../hooks/customerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function WithdrawalAccountUpdate() {

  const { 
    customer: { 
      customer: {
        customer: {
          customer
        }
      } 
    } 
  } = useAppContext();

  const [
    banks,
    banksFetchStatus,
    retry
  ] = useBankList();

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    bankCodeError, 
    nameError, 
    numberError, 
    typeError
  ] = useCustomerWithdrawalAccountUpdate();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            banksFetchStatus,
            ()=> <UpdateWithdrawalAccountForm 
                  banks={banks} 
                  account={customer.user.withdrawal_account} 
                  dialog={dialog}
                  onSubmit={onSubmit}
                  formError={formError} 
                  formSuccess={formSuccess}
                  bankCodeError={bankCodeError}
                  nameError={nameError}
                  numberError={numberError}
                  typeError={typeError}
                  />,
            ()=> <Loading />,
            ()=> <Reload action={retry} />
          )
        }
      </div>
    </section>
  );
}
