
import Icon from "@mdi/react";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { cartIcon, copyIcon, deleteIcon } from "../assets/icons";
import { CART } from "../context/AppActions";
import { API_URL, useAppContext } from "../context/AppContext";
import AlertDialog from "./AlertDialog";
import Loading from "./Loading";
import Reload from "./Reload";

export default function SavedCartItem({ cart: { code, name, number_of_items } }) {

  const { t } = useTranslation();

  const history = useHistory()

  const { cartDispatch } = useAppContext();

  const [dialog, setDialog] = useState(null);

  async function fetchSavedCart() {
    
    try {
      let response = await fetch(`${API_URL}saved-cart.json?code=${code}`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();
      
      cartDispatch({
        type: CART.DUMPED,
        payload: data.data
      });

      history.push('/cart');

    } catch (err) {
      
      setDialog({
        body: {
          layout() {
            return <Reload action={openCart} />
          }
        },
        negativeButton: {
          text: '_extra.Cancel',
          action() {
            setDialog(null);
          }
        }
      });

    }
  }

  function copyCode() {
    alert(code);
  }

  function openCart() {
    
    setDialog({
      body: {
        layout() {
          return <Loading />
        }
      },
      negativeButton: {
        text: '_extra.Cancel',
        action() {
          setDialog(null);
        }
      }
    });

    fetchSavedCart();
  }
  
  function deleteCart() {
    alert('Deleting cart...');
  }

  return (
    <li>
      <div className="mb-4 py-2 rounded md:shadow md:px-2">
        <div className="text-lg font-bold mb-1">{ code }</div>
        <div className="text-lg mb-1">{ name }</div>
        <div className="mb-1 text-color-gray">{ t('_order.item__Num', { count: number_of_items }) }</div>
        <div className="flex gap-4">
          <button className="flex flex-grow gap-2 btn-color-primary p-2 rounded" onClick={openCart}>
            <Icon path={cartIcon} className="w-6 h-6" />
            <span>{ t('_cart.Open_cart') }</span>
          </button>
          <button className="flex gap-2 btn-color-blue p-2 rounded" onClick={copyCode}>
            <Icon path={copyIcon} className="w-6 h-6" />
            <span className="sr-only">{ t('_cart.Copy_code') }</span>
          </button>
          <button className="flex gap-2 btn-color-red p-2 rounded" onClick={deleteCart}>
            <Icon path={deleteIcon} className="w-6 h-6" />
            <span className="sr-only">{ t('_extra.Delete') }</span>
          </button>
        </div>
        { dialog && <AlertDialog dialog={dialog} /> }
      </div>
    </li>
  );
}
