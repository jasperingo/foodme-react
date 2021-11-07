
import React from 'react';
import { useParams } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, USER_ADDRESS } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

const getFetchStatusAction = (payload) => ({
  type: USER_ADDRESS.FETCH_STATUS_CHANGED,
  payload
});


export default function Address() {

  const idParam = useParams().ID;

  const ID  = idParam === 'add' ? 0 : parseInt(idParam);

  const { customer: {
    address: {
      address,
      addressFetchStatus
    }
  }, customerDispatch } = useAppContext();


  async function fetchAddress() {

    if (addressFetchStatus !== FETCH_STATUSES.LOADING) 
      return;
    
    try {
      let response = await fetch(`${API_URL}address.json`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();

      data.data.id = ID;

      customerDispatch({
        type: USER_ADDRESS.FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      customerDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }
  
  function refetchAddress() {
    if (addressFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    customerDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  if (address !== null && address.id !== ID)
    customerDispatch({ type: USER_ADDRESS.UNFETCHED });
  else if (ID !== 0) {
    fetchAddress();
  } else {
    if (addressFetchStatus === FETCH_STATUSES.LOADING)
      customerDispatch({
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
