
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AddButton from '../../components/AddButton';
import DeleteIcon from '../../icons/DeleteIcon';
import EditIcon from '../../icons/EditIcon';

function AddressItem({ address: { id, title, street, city, state, is_default } }) {

  const { t } = useTranslation();

  return (
    <li>
      <div className="border rounded mb-4">
        <div className="p-2">
          <div className="py-2 font-bold">{ title }</div>
          <div>{ street }</div>
          <div>{ city }</div>
          <div>{ state }</div>
        </div>
        <div className="flex gap-4 p-2 border-t">

          <button className={`${is_default ? 'text-color-gray' : 'text-color-primary'} flex-grow text-left`}>
            { is_default ? t('_user.Default_address') : t('_extra.Make_default') }
          </button>

          <Link to={`/account/address/${id}`}>
            <span className="sr-only">{ t('_extra.Edit') }</span>
            <EditIcon classList="text-color-primary" />
          </Link>

          <button>
            <span className="sr-only">{ t('_extra.Delete') }</span>
            <DeleteIcon classList="text-color-primary" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default function Addresses() {

  

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <AddButton text="_user.Add_address" href="/account/address/add" />

        <ul className="list-2-x">
          <AddressItem 
            address={{
              id: 1,
              title: 'Home address', 
              street: '30 Jones street', 
              city: 'Owerri-ihiagwa', 
              state: 'Imo',
              is_default: true
            }}
            />

          <AddressItem 
            address={{
              id: 2,
              title: 'Office address', 
              street: '2 Mack street, off free road', 
              city: 'Owerri-Oji', 
              state: 'Imo',
              is_default: false
            }}
            />
        </ul>

      </div>

    </section>
  );
}
