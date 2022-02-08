
import React from 'react';
import UpdateWithdrawalAccountForm from '../../components/form/WithdrawalAccountUpdateForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useBankList } from '../../hooks/bankHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreWithdrawalAccountUpdate } from '../../hooks/store/storeWithdrawalAccountHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function WithdrawalAccountUpdate() {

  const { 
    store: { 
      store: {
        store
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name ?? 'Loading...'} - Withdrawal Account`,
    headerTitle: '_transaction.Bank_account'
  });

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
  ] = useStoreWithdrawalAccountUpdate();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            banksFetchStatus,
            ()=> (
              <UpdateWithdrawalAccountForm 
                banks={banks} 
                account={store.user.withdrawal_account} 
                dialog={dialog}
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
