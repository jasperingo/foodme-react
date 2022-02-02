
import React, { useState } from 'react';
import { useCopyText, useDateFormat } from '../../hooks/viewHook';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import H4Heading from '../H4Heading';
import SavedCartSavedItem from '../list_item/SavedCartSavedItem';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';

export default function SavedCartProfile({ savedCart: { code, title, created_at, saved_cart_items } }) {

  const copy = useCopyText();

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

    setTimeout(()=> setLoadingDialog(false), 2000);

    // api.delete(code)
    //   .then(()=> {
    //     setDialog(null);
    //     savedCartsDispatch({
    //       type: SAVED_CART.DELETED,
    //       payload: code
    //     });
    //   })
    //   .catch(()=> {
    //     setDialog({
    //       body: '_errors.Something_went_wrong',
    //       negativeButton: {
    //         text: '_extra.Cancel',
    //         action() {
    //           setDialog(null);
    //         }
    //       }
    //     });
    //   });
  }

  function openCart() {
    console.log('Opening...')
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
                action: openCart
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

