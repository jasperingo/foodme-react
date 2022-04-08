
import React, { useEffect, useCallback } from 'react';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import AddressForm from '../../components/form/AddressForm';
import AddressDeleteForm from '../../components/form/AddressDeleteForm';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useAddressUpdate } from '../../hooks/address/addressUpdateHook';
import { useAddressFetch } from '../../hooks/address/addressFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useAddressDelete } from '../../hooks/address/addressDeleteHook';
import { useHeader } from '../../hooks/headerHook';
import { useParams } from 'react-router-dom';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

export default function AddressUpdate() {

  const { ID } = useParams();

  const [
    fetchLocations,
    locations,
    locationsLoading,
    locationsError,
    locationsLoaded
  ] = useLocationList();

  const [
    fetchAddress,
    address,
    addressLoading,
    addressError,
    addressID,
    unfetchAddress
  ] = useAddressFetch();

  useHeader({ 
    title: `${address?.title ?? 'Loading...'} - Address`,
    headerTitle: '_user.Edit_address'
  });

  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    titleError, 
    streetError, 
    cityError, 
    stateError, 
    defaultError
  ] = useAddressUpdate();

  const [
    deleteOnSubmit,
    deleteLoading,
    deleteFormSuccess, 
    deleteFormError, 
  ] = useAddressDelete();

  const locationFetch = useCallback(
    function() {
      if (!locationsLoading) 
        fetchLocations();
    },
    [locationsLoading, fetchLocations]
  );

  const addressFetch = useCallback(
    function(ID) {
      if (!addressLoading) 
        fetchAddress(ID);
    },
    [addressLoading, fetchAddress]
  );

  useEffect(
    function() { if (!locationsLoaded) locationFetch(); },
    [locationsLoaded, locationFetch]
  );

  useEffect(
    function() {
      if ((address !== null || addressError !== null) && addressID !== ID) 
        unfetchAddress();
      else if (address === null && addressError === null)
        addressFetch(ID);
    },
    [ID, address, addressError, addressID, addressFetch, unfetchAddress]
  );

  function retryLoad() {
    if (!locationsLoaded) locationFetch();
    if (address === null) addressFetch(ID);
  }

  return (
    <section>
      <div className="container-x">
        
        {  
          (locationsLoaded && address !== null) &&
          (
            <div>
              <AddressForm 
                address={address} 
                hasTitleAndType={true} 
                clearOnSuccess={false}
                locations={locations} 
                onSubmit={onSubmit}
                dialog={loading}
                formError={formError}
                formSuccess={formSuccess}
                titleError={titleError}
                streetError={streetError}
                cityError={cityError}
                stateError={stateError}
                defaultError={defaultError}
                />
                
              <AddressDeleteForm 
                onSubmit={deleteOnSubmit}
                dialog={deleteLoading}
                formError={deleteFormError}
                formSuccess={deleteFormSuccess}
                />
            </div>
          ) 
        }
        
        { (locationsLoading || addressLoading) && <Loading /> }

        { addressError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { addressError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { 
          (addressError === NetworkErrorCodes.UNKNOWN_ERROR || locationsError === NetworkErrorCodes.UNKNOWN_ERROR) && 
          <Reload action={retryLoad} /> 
        }

        { 
          (addressError === NetworkErrorCodes.NO_NETWORK_CONNECTION || locationsError === NetworkErrorCodes.NO_NETWORK_CONNECTION) && 
          <Reload message="_errors.No_netowrk_connection" action={retryLoad} /> 
        }
          
      </div>
    </section>
  );
}
