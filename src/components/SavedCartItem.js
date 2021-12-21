
import Icon from "@mdi/react";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import SavedCartApi from "../api/SavedCartApi";
import { cartIcon, copyIcon, deleteIcon } from "../assets/icons";
import { CART, SAVED_CART } from "../context/AppActions";
import { useAppContext } from "../context/AppContext";
import { useCopyText } from "../context/AppHooks";
import AlertDialog, { LOADING_DIALOG } from "./AlertDialog";
import Reload from "./Reload";

export default function SavedCartItem({ cart: { code, name, number_of_items } }) {

  const { t } = useTranslation();

  const history = useHistory()

  const { 
    user: { user },
    cartDispatch,
    savedCartsDispatch
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const api = new SavedCartApi(user.api_token);

  const copy = useCopyText();

  function copyCode() {

    copy(code);

    setDialog({
      body: '_extra.Code_copied',
      positiveButton: {
        text: '_extra.Done',
        action() {
          setDialog(null);
        }
      }
    });
  }

  function openCart() {
    setDialog(LOADING_DIALOG);
    api.get(code)
      .then((res)=> {
        cartDispatch({
          type: CART.DUMPED,
          payload: res.data
        });
        history.push('/cart');
      })
      .catch(()=> {
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
      });
  }
  
  function confirmDeleteCart() {
    
    setDialog({
      body: '_cart._confirm_saved_cart_delete',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          deleteCart();
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      }
    });
  }

  function deleteCart() {
    
    setDialog(LOADING_DIALOG);

    api.delete(code)
      .then(()=> {
        setDialog(null);
        savedCartsDispatch({
          type: SAVED_CART.DELETED,
          payload: code
        });
      })
      .catch(()=> {
        setDialog({
          body: '_errors.Something_went_wrong',
          negativeButton: {
            text: '_extra.Cancel',
            action() {
              setDialog(null);
            }
          }
        });
      });
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
          <button className="flex gap-2 btn-color-red p-2 rounded" onClick={confirmDeleteCart}>
            <Icon path={deleteIcon} className="w-6 h-6" />
            <span className="sr-only">{ t('_extra.Delete') }</span>
          </button>
        </div>
        { dialog && <AlertDialog dialog={dialog} /> }
      </div>
    </li>
  );
}
