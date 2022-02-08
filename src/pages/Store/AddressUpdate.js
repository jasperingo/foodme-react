
import React from 'react';
import AddressForm from '../../components/form/AddressForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreAddressUpdate } from '../../hooks/store/storeAddressUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

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
    locations, 
    locationsFetchStatus,
    retry
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

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            locationsFetchStatus,
            ()=> (
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
            ),
            ()=> <Loading />,
            ()=> <Reload action={retry} />
          )
        }
      </div>
    </section>
  );
}
