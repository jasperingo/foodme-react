
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiGetAddress from '../../api/user/apiGetAddress';
import apiPostAddress from '../../api/user/apiPostAddress';
import AlertDialog, { LOADING_DIALOG } from '../../components/AlertDialog';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormMessage from '../../components/FormMessage';
import FormSelect from '../../components/FormSelect';
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
      addressResponse,
      addressFetchStatus,
      addressPostFetchStatus
    }
  }, userDispatch } = useAppContext();

  const headers = useAuthHTTPHeader();

  const titleInput = useRef(null);

  const streetInput = useRef(null);

  const cityInput = useRef(null);

  const stateInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [titleError, setTitleError] = useState('');

  const [streetError, setStreetError] = useState('');

  const [cityError, setCityError] = useState('');

  const [stateError, setStateError] = useState('');

  useEffect(()=> {

    if (addressPostFetchStatus !== FETCH_STATUSES.PENDING || (address !== null && address.id !== ID)) {
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
    if (addressFetchStatus !== FETCH_STATUSES.LOADING) 
      userDispatch(getUserAddressFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function onFormSubmit(e) {
    e.preventDefault();

    let error = false;

    setFormError('');

    setFormSuccess('');

    if (!titleInput.current.validity.valid) {
      error = true;
      setTitleError('_errors.This_field_is_required');
    } else {
      setTitleError('');
    }

    if (!streetInput.current.validity.valid) {
      error = true;
      setStreetError('_errors.This_field_is_required');
    } else {
      setStreetError('');
    }

    if (!cityInput.current.validity.valid) {
      error = true;
      setCityError('_errors.This_field_is_required');
    } else {
      setCityError('');
    }

    if (!stateInput.current.validity.valid) {
      error = true;
      setStateError('_errors.This_field_is_required');
    } else {
      setStateError('');
    }
    
    if (!error) {
      
      setFormError('');
      
      userDispatch({
        type: USER_ADDRESS.CREATE_STATUS_CHANGED,
        payload: FETCH_STATUSES.LOADING
      });
      
      setDialog(LOADING_DIALOG);
    }
  }

  useEffect(()=> {

    if (addressPostFetchStatus === FETCH_STATUSES.LOADING) {
      apiPostAddress(
        userDispatch, 
        'customer/address.json', 
        (ID === 0 ? 'POST' : 'PUT'), 
        headers,
        {
          title: titleInput.current.value,
          street: streetInput.current.value,
          city: cityInput.current.value,
          state: stateInput.current.value,
          id: ID === 0 ? undefined : ID
        }
      );
    } else if (dialog !== null) {
      setDialog(null);
    }

    if (addressPostFetchStatus === FETCH_STATUSES.ERROR) {
      setFormError(addressResponse.errors.form);
      setTitleError(addressResponse.errors.title);
      setStreetError(addressResponse.errors.street);
      setCityError(addressResponse.errors.city);
      setStateError(addressResponse.errors.state);
    } else if (addressPostFetchStatus === FETCH_STATUSES.DONE) {
      setFormSuccess(addressResponse.success);
    }

  }, [ID, headers, addressResponse, addressPostFetchStatus, dialog, userDispatch]);


  return (
    <section className="flex-grow">
      <div className="container-x">

        { 
          useDataRender(
            address, 
            addressFetchStatus,
            ()=> (
              <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

                { 
                  (formError || formSuccess) && 
                  <FormMessage 
                    text={formSuccess ? formSuccess : formError} 
                    type={formSuccess ? FormMessage.TYPE_SUCCESS : FormMessage.TYPE_ERROR} 
                    /> 
                }

                <FormField 
                  ref={titleInput}
                  error={titleError}
                  ID="address-title-input" 
                  label="_extra.Title" 
                  value={ address.title } 
                  required={true}
                  />

                <FormField 
                  ref={streetInput}
                  error={streetError}
                  ID="address-street-input" 
                  label="_user.Street" 
                  value={ address.street } 
                  required={true}
                  />

                <FormField 
                  ref={cityInput}
                  error={cityError}
                  ID="address-city-input" 
                  label="_user.City" 
                  value={ address.city } 
                  required={true}
                  />

                <FormSelect
                  ref={stateInput}
                  error={stateError}
                  ID="address-state-input" 
                  label="_user.State" 
                  value={ address.state } 
                  required={true}
                  options={[
                    'Abia',
                    'Imo',
                    'Rivers'
                  ]}
                  />

                <FormButton text="_extra.Submit" />

              </form>
            ),
            ()=> <Loading />, 
            ()=> <Reload action={refetchAddress} />,
          )
        }
      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

    </section>
  );
}
