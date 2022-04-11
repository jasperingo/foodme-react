
import React, { useEffect } from 'react';
import UpdateWithdrawalAccountForm from '../../components/form/WithdrawalAccountUpdateForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useBankList } from '../../hooks/bankHook';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerWithdrawalAccountUpdate } from '../../hooks/customer/customerWithdrawalAccountUpdateHook';
import { useHeader } from '../../hooks/headerHook';

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
    fetchBanks, 
    banks,  
    banksLoading,
    banksLoaded,
    banksError
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
        }
        
        { banksLoading && <Loading /> }

        { banksError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchBanks} /> }

        { banksError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchBanks} /> }

      </div>
    </section>
  );
}
