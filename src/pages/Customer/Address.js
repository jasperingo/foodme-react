
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddressApi from '../../api/AddressApi';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import UpdateAddressForm from '../../components/UpdateAddressForm';
import { FETCH_STATUSES, getUserAddressFetchStatusAction, USER_ADDRESS } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function Address() {

  const idParam = useParams().ID;

  const ID  = idParam === 'add' ? 0 : parseInt(idParam);

  const { user: {
    user, 
    address: {
      address,
      addressFetchStatus,
    }
  }, userDispatch } = useAppContext();

  useEffect(()=> {
    
    if (address !== null && address.id !== ID) {
      userDispatch({ type: USER_ADDRESS.UNFETCHED });
    } else if (ID !== 0 && addressFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new AddressApi(user.api_token);
      api.get(ID, userDispatch);
    } else if (addressFetchStatus === FETCH_STATUSES.LOADING) {
      userDispatch({
        type: USER_ADDRESS.FETCHED,
        payload: { id: 0, title: '', street: '', city: '', state: '' }
      });
    }
  });
  
  function refetchAddress() {
    if (addressFetchStatus !== FETCH_STATUSES.LOADING) 
      userDispatch(getUserAddressFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">

        { 
          useDataRender(
            address, 
            addressFetchStatus,
            ()=> <UpdateAddressForm address={address} hasTitle={true} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchAddress} />,
          )
        }
      </div>

    </section>
  );
}
