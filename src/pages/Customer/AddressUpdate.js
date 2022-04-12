
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import AddressForm from '../../components/form/AddressForm';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useAddressUpdate } from '../../hooks/address/addressUpdateHook';
import { useAddressFetch } from '../../hooks/address/addressFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useAddressDelete } from '../../hooks/address/addressDeleteHook';
import { useHeader } from '../../hooks/headerHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import DeleteForm from '../../components/form/DeleteForm';

export default function AddressUpdate() {

  const { ID } = useParams();

  const history = useHistory();

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

  useEffect(
    function() { 
      if (!locationsLoaded && locationsError === null) 
        fetchLocations(); 
    },
    [locationsLoaded, locationsError, fetchLocations]
  );

  useEffect(
    function() {
      if ((address !== null || addressError !== null) && addressID !== ID) 
        unfetchAddress();
      else if (address === null && addressError === null)
        fetchAddress(ID);
    },
    [ID, address, addressError, addressID, fetchAddress, unfetchAddress]
  );

  useEffect(
    function() {
      if (deleteFormSuccess !== null) history.push('/addresses');
    }, 
    [deleteFormSuccess, history]
  );

  function retryLoad() {
    if (!locationsLoaded) fetchLocations();
    if (address === null) fetchAddress(ID);
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

              <DeleteForm 
                confirmMessage="_user._address_delete_confirm"
                onSubmit={deleteOnSubmit} 
                dialog={deleteLoading}
                formSuccess={deleteFormSuccess}
                formError={deleteFormError}
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
