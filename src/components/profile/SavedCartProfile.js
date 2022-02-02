
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useCopyText, useDateFormat } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import H4Heading from '../H4Heading';
import SavedCartSavedItem from '../list_item/SavedCartSavedItem';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';

export default function SavedCartProfile({ onDeleteSubmit, savedCart: { id, code, title, created_at, saved_cart_items } }) {

  const {
    cart: {
      cartDispatch
    }
  } = useAppContext();

  const { t } = useTranslation();

  const history = useHistory();

  const copy = useCopyText();

  const cartItems = [];

  const [alertDialog, setAlertDialog] = useState(null);
  
  const [loadingDialog, setLoadingDialog] = useState(null);

  function copyCode() {

    copy(code);

    setAlertDialog({
      body: '_extra.Copied',
      positiveButton: {
        text: '_extra.Done',
        action() {
          setAlertDialog(null);
        }
      }
    });
  }

   function confirmDeleteCart() {
    
    setAlertDialog({
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
          setAlertDialog(null);
        }
      }
    });
  }

  function deleteCart() {
    
    setAlertDialog(null);

    setLoadingDialog(true);

    onDeleteSubmit(id, {

      onSuccess() {
        setLoadingDialog(false);
        history.goBack();
      },

      onError(message) {
        setLoadingDialog(false);
        setAlertDialog({
          body: message,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setAlertDialog(null);
            }
          }
        });
      }

    });
  }

  function openCartConfirm() {

    let itemsUnavailable = 0;

    for (let item of saved_cart_items) {

      if (
        !item.product_variant.available || 
        item.product_variant.quantity < item.quantity || 
        item.product_variant.quantity === 0
      ) {
        itemsUnavailable++;
        continue;
      }

      cartItems.push({
        quantity: item.quantity,
        product_variant: item.product_variant,
        amount: (item.product_variant.price * item.quantity),
        product: item.product_variant.product
      });
    }

    if (itemsUnavailable > 0) {

      setAlertDialog({
        body: t('_cart._num_products_are_available', { count: itemsUnavailable }),
        positiveButton: {
          text: '_extra.Yes',
          action() {
            openCart();
          }
        },
        negativeButton: {
          text: '_extra.No',
          action() {
            setAlertDialog(null);
          }
        }
      });

    } else {
      openCart();
    }
  }

  function openCart() {
    cartDispatch({
      type: CART.ITEMS_REPLACED,
      payload: {
        list: cartItems,
        fetchStatus: cartItems.length > 0 ? FETCH_STATUSES.DONE : FETCH_STATUSES.EMPTY
      }
    });

    setAlertDialog({
      body: '_cart.Cart_has_been_opened',
      positiveButton: {
        text: '_extra.Done',
        action() {
          setAlertDialog(null);
        }
      },
    });
  }

  return (
    <>
      <div className="py-2 border-b">
        <div className="container-x">
          
          <ProfileHeaderText
            text={code}
            buttons={[
              {
                text: '_cart.Open_cart',
                color: 'btn-color-primary',
                action: openCartConfirm
              },
              {
                text: '_cart.Copy_code',
                color: 'btn-color-primary',
                action: copyCode
              },
              {
                text: '_extra.Delete',
                color: 'btn-color-red',
                action: confirmDeleteCart
              },
            ]}
            />

          <ProfileDetailsText
            details={[
              {
                title: '_cart.Saved_on',
                body: useDateFormat(created_at)
              },
              {
                title: '_extra.Title',
                body: title
              }
            ]}
            />

        </div>
      </div>

      <div className="py-2 border-b">
        <div className="container-x">
          <H4Heading color="text-color-gray" text="_cart.Saved_items" />
          <ul className="list-3-x">
            {
              saved_cart_items.map((item)=> <SavedCartSavedItem key={`saved-cart-saved-item-${item.id}`} item={item} />)
            }
          </ul>
        </div>
      </div>
      
      {
        loadingDialog && <LoadingDialog />
      }
      {
        alertDialog && <AlertDialog dialog={alertDialog} />
      }
    </>
  );
}

