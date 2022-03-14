
import React from 'react';
import { locationIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import AddressItem from '../../components/list_item/AddressItem';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAddressList } from '../../hooks/address/addressListHook';
import { useRenderListFooter } from '../../hooks/viewHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';

export default function Addresses() {

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${customer.user.name} - Addresses`,
    headerTitle: "_user.Addresses"
  });
  
  const [
    addresses,
    addressesFetchStatus,
    refetch,
    refresh
  ] = useAddressList(customer.user, customerToken);

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_user.Add_address" href="/address/add" />

        <SingleList
          data={addresses}
          className="list-2-x"
          refreshPage={refresh}
          renderDataItem={(item)=> (
            <AddressItem key={`addresses-${item.id}`} address={item} canEdit={true} />
          )}
          footer={useRenderListFooter(
            addressesFetchStatus,
            ()=> <li key="addresses-footer"> <Loading /> </li>, 
            ()=> <li key="addresses-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="addresses-footer" className="col-span-2"> <EmptyList text="_empty.No_address" icon={locationIcon} /> </li>
          )}
          />

      </div>

    </section>
  );
}
