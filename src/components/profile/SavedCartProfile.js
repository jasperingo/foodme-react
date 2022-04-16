
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useSavedCartItemsToCartItems } from '../../hooks/saved_cart/savedCartItemsToCartItemsHook';
import { useCopyText, useDateFormatter } from '../../hooks/viewHook';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import H4Heading from '../H4Heading';
import SavedCartSavedItem from '../list_item/SavedCartSavedItem';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';

export default function SavedCartProfile(
  { 
    onDeleteSubmit, 
    deleteLoading,
    deleteFormError,
    resetDeleteSubmit,
    savedCart: { id, code, title, created_at, saved_cart_items } 
  }
) {

  const {
    cart: {
      cartDispatch
    }
  } = useAppContext();

  const { t } = useTranslation();

  const copy = useCopyText();

  const dateFormat = useDateFormatter();

  const [alertDialog, setAlertDialog] = useState(null);

  const convertToCartItems = useSavedCartItemsToCartItems();

  useEffect(
    function() {

      if (deleteFormError !== null) {
        setAlertDialog({
          body: deleteFormError,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setAlertDialog(null);
              resetDeleteSubmit();
            }
          }
        });
      }
    },
    [deleteFormError, resetDeleteSubmit]
  );

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
    onDeleteSubmit(id);
  }

  function openCartConfirm() {

    const [cart, itemsUnavailable] = convertToCartItems(saved_cart_items);

    if (itemsUnavailable > 0) {

      setAlertDialog({
        body: t('_cart._num_products_are_available', { count: itemsUnavailable }),
        positiveButton: {
          text: '_extra.Yes',
          action() {
            openCart(cart);
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
      openCart(cart);
    }
  }

  function openCart(cartItems) {
    cartDispatch({
      type: CART.ITEMS_REPLACED,
      payload: { list: cartItems }
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
                body: dateFormat(created_at)
              },
              {
                title: '_extra.Title',
                body: title
              }
            ]}
            />

        </div>
      </div>

      <div className="py-2">
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
        deleteLoading && <LoadingDialog />
      }
      {
        alertDialog && <AlertDialog dialog={alertDialog} />
      }
    </>
  );
}

