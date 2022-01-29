
import React from 'react';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import AddressForm from '../../components/form/AddressForm';
import AddressDeleteForm from '../../components/form/AddressDeleteForm';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useAddressUpdate } from '../../hooks/address/addressUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';
import { useAddressFetch } from '../../hooks/address/addressFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useAddressDelete } from '../../hooks/address/addressDeleteHook';

export default function AddressUpdate() {

  const [
    locations, 
    locationsFetchStatus,
    retry
  ] = useLocationList();

  const [
    address,
    addressFetchStatus,
    refetch
  ] = useAddressFetch();

  const [
    onSubmit, 
    dialog, 
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
    deleteDialog,
    deleteFormSuccess, 
    deleteFormError, 
  ] = useAddressDelete();

  function retryLoad() {
    refetch();
    retry();
  }

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            [locationsFetchStatus, addressFetchStatus],
            ()=> (
              <div>
                <AddressForm 
                  address={address} 
                  hasTitleAndType={true} 
                  clearOnSuccess={false}
                  locations={locations} 
                  onSubmit={onSubmit}
                  dialog={dialog}
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
                  dialog={deleteDialog}
                  formError={deleteFormError}
                  formSuccess={deleteFormSuccess}
                  />
              </div>
            ),
            ()=> <Loading />,
            ()=> <Reload action={retryLoad} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
