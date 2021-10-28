
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCategoryColor } from '../context/AppHooks';
import CartIcon from '../icons/CartIcon';
import FavoritedIcon from '../icons/FavoritedIcon';
import LocationIcon from '../icons/LocationIcon';
import OrderIcon from '../icons/OrderIcon';
import TransactionIcon from '../icons/TransactionIcon';
import UserIcon from '../icons/UserIcon';

const MENU_ITEMS = [
  { text: '_user.Profile', Icon: UserIcon, href: ''},
  { text: '_order.Orders', Icon: OrderIcon, href: ''},
  { text: '_extra.Favorites', Icon: FavoritedIcon, href: ''},
  { text: '_cart.Saved_carts', Icon: CartIcon, href: ''},
  { text: '_user.Addresses', Icon: LocationIcon, href: ''},
  { text: '_transaction.Transactions', Icon: TransactionIcon, href: ''},
];


function MenuItem({ Icon, text, href, index }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  return (
    <li>
      <Link 
        to="/account"
        className={`p-2 block rounded hover:bg-color-gray-h ${iconColor}`}
        >
        <Icon classList="w-10 h-10 mx-auto" />
        <div className="text-center">{ t(text) }</div>
      </Link>
    </li>
  );
}

export default function UserAccount() {

  const { t } = useTranslation();

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/login" />)
  }

  return (
    <section>
      <div className="container-x">
        
        <div className="py-5">
          <img 
            src="/photos/user.jpg" 
            alt="USER" 
            width="100" 
            height="100" 
            className="w-20 h-20 rounded-full mx-auto my-2 border"
            />
          <div className="text-center font-bold text-lg">Paul Johnson</div>
        </div>

        <ul className="grid grid-cols-3 gap-2 pt-5">
          { 
            MENU_ITEMS.map((item, i)=> (
              <MenuItem 
                index={i}
                text={item.text}
                Icon={item.Icon}
                href={item.href}
                key={`menu-item-${i}`}
                />
            ))
          }
          <li className="col-span-3 mt-5">
            <button className="w-full bg-color-gray py-2 rounded">{ t('_user.Log_out') }</button>
          </li>
        </ul>

      </div>
    </section>
  );
}

