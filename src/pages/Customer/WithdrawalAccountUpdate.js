
import React from 'react';
import UpdateWithdrawalAccountForm from '../../components/form/WithdrawalAccountUpdateForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useBankList } from '../../hooks/bankHook';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerWithdrawalAccountUpdate } from '../../hooks/customer/customerWithdrawalAccountUpdateHook';
import { useHeader } from '../../hooks/headerHook';
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

  useHeader({ 
    title: `${customer.user.name ?? 'Loading...'} - Withdrawal Account`,
    headerTitle: '_transaction.Bank_account'
  });

  const [
    banks,
    banksFetchStatus,
    retry
  ] = useBankList();

  const [
    onSubmit, 
    loading, 
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
            ()=> (
              <UpdateWithdrawalAccountForm 
                banks={banks} 
                account={customer.user.withdrawal_account} 
                dialog={loading}
                onSubmit={onSubmit}
                formError={formError} 
                formSuccess={formSuccess}
                bankCodeError={bankCodeError}
                nameError={nameError}
                numberError={numberError}
                typeError={typeError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={retry} />
          )
        }
      </div>
    </section>
  );
}
