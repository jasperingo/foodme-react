
import React from 'react';
import UpdateWithdrawalAccountForm from '../../components/form/WithdrawalAccountUpdateForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useBankList } from '../../hooks/bankHook';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmWithdrawalAccountUpdate } from '../../hooks/delivery_firm/deliveryFirmWithdrawalAccountHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function WithdrawalAccountUpdate() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${deliveryFirm.user.name ?? 'Loading...'} - Withdrawal Account`,
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
  ] = useDeliveryFirmWithdrawalAccountUpdate();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            banksFetchStatus,
            ()=> (
              <UpdateWithdrawalAccountForm 
                banks={banks} 
                account={deliveryFirm.user.withdrawal_account} 
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
