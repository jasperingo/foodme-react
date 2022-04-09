
import React from 'react';
import { locationIcon } from '../../assets/icons';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import SingleList from './SingleList';
import AddressItem from '../list_item/AddressItem';
import Loading from '../Loading';
import Reload from '../Reload';
import AddressButtonItem from '../list_item/AddressButtonItem';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import NotFound from '../NotFound';
import Forbidden from '../Forbidden';

export default function AddressList(
  { addresses, addressesLoading, addressesError, addressesLoaded, fetchAddresses, refreshList, canEdit, renderButtons, onButtonClicked }
) {

  const listFooter = useListFooter();

  return (
    <div className="container-x">

      <SingleList
        data={addresses}
        className="list-2-x"
        refreshPage={refreshList}
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
            canRender: addressesError === NetworkErrorCodes.FORBIDDEN,
            render() {
              return (
                <li key="address-footer" className="list-2-x-col-span">
                  <Forbidden />
                </li>
              );
            }
          },
          {
            canRender: addressesError === NetworkErrorCodes.NOT_FOUND,
            render() {
              return (
                <li key="address-footer" className="list-2-x-col-span">
                  <NotFound />
                </li>
              );
            }
          },
          {
            canRender: addressesError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="address-footer" className="list-2-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchAddresses} />
                </li>
              );
            }
          },
          {
            canRender: addressesError === NetworkErrorCodes.UNKNOWN_ERROR,
            render() { 
              return (
                <li key="address-footer" className="list-2-x-col-span"> 
                  <Reload action={fetchAddresses} /> 
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
