
import React, { useEffect } from 'react';
import AddressForm from '../../components/form/AddressForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAddressAdd } from '../../hooks/address/addressAddHook';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useHeader } from '../../hooks/headerHook';

export default function AddressAdd() {

  useHeader({
    title: 'Create new - Address',
    headerTitle: '_user.Add_address'
  });

  const [
    fetchLocations,
    locations,
    locationsLoading,
    locationsError,
    locationsLoaded
  ] = useLocationList();

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
  ] = useAddressAdd();

  useEffect(
    function() { 
      if (!locationsLoaded && locationsError === null) 
        fetchLocations(); 
    },
    [locationsLoaded, locationsError, fetchLocations]
  );

  return (
    <section>
      <div className="container-x">
        {
          locationsLoaded && 
          <AddressForm 
            address={{}} 
            hasTitleAndType={true} 
            clearOnSuccess={true}
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
        }

        { locationsLoading && <Loading /> }

        { locationsError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchLocations} /> }

        { locationsError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchLocations} /> }
        
      </div>
    </section>
  );
}
