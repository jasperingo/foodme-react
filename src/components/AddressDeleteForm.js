
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AddressApi from '../api/AddressApi';
import { ADDRESS } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormButton from './FormButton';

export default function AddressDeleteForm({ address }) {

  const history = useHistory();

  const { 
    user: { user },
    addressesDispatch 
  } = useAppContext();
  
  const [dialog, setDialog] = useState(null);

  const api = new AddressApi(user.api_token);

  function onDeleteSubmit(e) {
    e.preventDefault();
    
    setDialog(LOADING_DIALOG);

    api.delete(address.id)
      .then(res=> {
        history.push('/addresses');
        addressesDispatch({
          type: ADDRESS.DELETED,
          payload: address.id
        });
      })
      .catch(err=> {
        setDialog({
          body: '_errors.Something_went_wrong',
          negativeButton: {
            text: '_extra.Cancel',
            action() {
              setDialog(null);
            }
          }
        });
      });
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onDeleteSubmit}>
      <FormButton text="_user.Delete_address" color='btn-color-red' />
      { dialog && <AlertDialog dialog={dialog} /> }
    </form>
  );
}
