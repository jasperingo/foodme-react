
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiGetAddress from '../../api/user/apiGetAddress';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getUserAddressFetchStatusAction, USER_ADDRESS } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useAuthHTTPHeader, useDataRender } from '../../context/AppHooks';

export default function Address() {

  const idParam = useParams().ID;

  const ID  = idParam === 'add' ? 0 : parseInt(idParam);

  const { user: {
    address: {
      address,
      addressFetchStatus
    }
  }, userDispatch } = useAppContext();

  const headers = useAuthHTTPHeader();


  useEffect(()=> {

    if (address !== null && address.id !== ID) {
      userDispatch({ type: USER_ADDRESS.UNFETCHED });
    } else if (ID !== 0 && addressFetchStatus === FETCH_STATUSES.LOADING) {
      apiGetAddress(userDispatch, `customer/address.json?=${ID}`, headers);
    } else if (addressFetchStatus === FETCH_STATUSES.LOADING) {
      userDispatch({
        type: USER_ADDRESS.FETCHED,
        payload: {
          id: 0,
          title: '', 
          street: '', 
          city: '', 
          state: ''
        }
      });
    }
  });
  
  
  function refetchAddress() {
    if (addressFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    userDispatch(getUserAddressFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="flex-grow">
      <div className="container-x">

        { 
          useDataRender(
            address, 
            addressFetchStatus,
            ()=> (
              <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit}>

                <FormField ID="address-title-input" label="_extra.Title" value={ address.title } />

                <FormField ID="address-street-input" label="_user.Street" value={ address.street } />

                <FormField ID="address-city-input" label="_user.City" value={ address.city } />

                <FormField ID="address-state-input" label="_user.State" value={ address.state } />

                <FormButton text="_extra.Submit" />

              </form>
            ),
            (k)=> <Loading />, 
            (k)=> <Reload action={refetchAddress} />,
          )
        }
      </div>
    </section>
  );
}
