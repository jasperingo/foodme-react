
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AddButton from '../../components/AddButton';
import DeleteIcon from '../../icons/DeleteIcon';
import EditIcon from '../../icons/EditIcon';

function AddressItem() {

  const { t } = useTranslation();

  return (
    <li>
      <div className="border">
        <div className="p-2">
          <div className="py-2 font-bold">Home address</div>
          <div>30 Frog road</div>
          <div>Owerri-ihiagwa</div>
          <div>Imo state</div>
        </div>
        <div className="flex gap-4 p-2 border-t">
          <button className="text-color-primary flex-grow text-left">{ t('_extra.Make_default') }</button>
          <Link to="/account/address/1">
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
          <AddressItem />
        </ul>

      </div>

    </section>
  );
}
