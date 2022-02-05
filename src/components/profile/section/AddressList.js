
import React from 'react';
import { locationIcon } from '../../../assets/icons';
import { useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import SingleList from '../../list/SingleList';
import AddressItem from '../../list_item/AddressItem';
import Loading from '../../Loading';
import Reload from '../../Reload';

export default function AddressList({ addresses, addressesFetchStatus, refetch, canEdit }) {

  return (
    <div className="container-x">

      <SingleList
        data={addresses}
        className="list-2-x"
        renderDataItem={(item)=> (
          <AddressItem key={`addresses-${item.id}`} address={item} canEdit={canEdit} />
        )}
        footer={useRenderListFooter(
          addressesFetchStatus,
          ()=> <li key="addresses-footer"> <Loading /> </li>, 
          ()=> <li key="addresses-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="addresses-footer" className="col-span-2"> <EmptyList text="_empty.No_address" icon={locationIcon} /> </li>
        )}
        />

    </div>
  );
}
