
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddressApi from '../../api/AddressApi';
import CustomerApp from '../../apps/CustomerApp';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import AddressForm from '../../components/AddressForm';
import { ADDRESS, FETCH_STATUSES, getAddressFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';
import AddressDeleteForm from '../../components/AddressDeleteForm';

export default function AddressUpdate() {

  const ID = parseInt(useParams().ID);

  const { 
    user: { user },
    addresses: {
      address: {
        address,
        addressFetchStatus,
      }
    }, 
    addressesDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (address !== null && address.id !== ID) {
      addressesDispatch({ type: ADDRESS.UNFETCHED });
    } else if (ID !== 0 && addressFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new AddressApi(user.api_token);
      api.getByCustomer(ID, addressesDispatch);
    }
  });
  
  function refetchAddress() {
    if (addressFetchStatus !== FETCH_STATUSES.LOADING) 
      addressesDispatch(getAddressFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            address, 
            addressFetchStatus,
            ()=> (
              <div>
                <AddressForm address={address} appType={CustomerApp.TYPE} />
                <AddressDeleteForm address={address} />
              </div>
            ),
            ()=> <Loading />, 
            ()=> <Reload action={refetchAddress} />,
          )
        }
      </div>
    </section>
  );
}
