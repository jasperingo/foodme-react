
import React, { useEffect } from 'react';
import UpdateWithdrawalAccountForm from '../../components/form/WithdrawalAccountUpdateForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useBankList } from '../../hooks/bankHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreWithdrawalAccountUpdate } from '../../hooks/store/storeWithdrawalAccountHook';

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
    fetchBanks, 
    banks,  
    banksLoading,
    banksLoaded,
    banksError
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

  useEffect(
    function() { 
      if (!banksLoaded && banksError === null) 
        fetchBanks(); 
    },
    [banksLoaded, banksError, fetchBanks]
  );

  return (
    <section>
      <div className="container-x">
        {
          banksLoaded && 
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
        }
        
        { banksLoading && <Loading /> }

        { banksError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchBanks} /> }

        { banksError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchBanks} /> }

      </div>
    </section>
  );
}
