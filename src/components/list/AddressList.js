
import React from 'react';
import { locationIcon } from '../../assets/icons';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import SingleList from './SingleList';
import AddressItem from '../list_item/AddressItem';
import Loading from '../Loading';
import Reload from '../Reload';
import AddressButtonItem from '../list_item/AddressButtonItem';

export default function AddressList(
  { addresses, addressesLoading, addressesError, addressesLoaded, retryFetch, refresh, canEdit, renderButtons, onButtonClicked }
) {

  const listFooter = useListFooter();

  return (
    <div className="container-x">

      <SingleList
        data={addresses}
        className="list-2-x"
        refreshPage={refresh}
        renderDataItem={(item)=> (
          renderButtons ? 
          <AddressButtonItem key={`addresses-${item.id}`} address={item} onClick={onButtonClicked} />
          :
          <AddressItem key={`addresses-${item.id}`} address={item} canEdit={canEdit} />
        )}
        footer={listFooter([
          {
            canRender: addressesLoading,
            render() { 
              return ( 
                <li key="address-footer" className="list-2-x-col-span"> 
                  <Loading /> 
                </li> 
              ); 
            },
          },
          {
            canRender: addressesError !== null,
            render() { 
              return (
                <li key="address-footer" className="list-2-x-col-span"> 
                  <Reload action={retryFetch} /> 
                </li> 
              );
            },
          },
          {
            canRender: addressesLoaded && addresses.length === 0,
            render() { 
              return (
                <li key="address-footer" className="list-2-x-col-span"> 
                  <EmptyList text="_empty.No_address" icon={locationIcon} /> 
                </li> 
              );
            }
          }
        ])}
        />

    </div>
  );
}
