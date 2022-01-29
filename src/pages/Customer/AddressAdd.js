
import React from 'react';
import AddressForm from '../../components/form/AddressForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAddressAdd } from '../../hooks/address/addressAddHook';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function AddressAdd() {

  const [
    locations, 
    locationsFetchStatus,
    retry
  ] = useLocationList();

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
  ] = useAddressAdd();

  const address = { id: 0, title: '', street: '', city: '', state: '' };

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            locationsFetchStatus,
            ()=> <AddressForm 
                  address={address} 
                  hasTitleAndType={true} 
                  clearOnSuccess={true}
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
                  />,
            ()=> <Loading />,
            ()=> <Reload action={retry} />
          )
        }
      </div>
    </section>
  );
}
