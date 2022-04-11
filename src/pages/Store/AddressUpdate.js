
import React, { useEffect } from 'react';
import AddressForm from '../../components/form/AddressForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreAddressUpdate } from '../../hooks/store/storeAddressUpdateHook';

export default function AddressUpdate() {

  const { 
    store: { 
      store: {
        store
      } 
    } 
  } = useAppContext();

  useHeader({
    title: `${store.user.name ?? 'Loading...'} - Address`,
    headerTitle: '_user.Edit_address'
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
    dialog, 
    formError, 
    formSuccess, 
    streetError, 
    cityError, 
    stateError, 
  ] = useStoreAddressUpdate();

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
            address={store.user.addresses[0]} 
            hasTitleAndType={false} 
            clearOnSuccess={false}
            locations={locations} 
            onSubmit={onSubmit}
            dialog={dialog}
            formError={formError}
            formSuccess={formSuccess}
            streetError={streetError}
            cityError={cityError}
            stateError={stateError}
            />
        }

        { locationsLoading && <Loading /> }

        { locationsError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchLocations} /> }

        { locationsError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchLocations} /> }

      </div>
    </section>
  );
}
