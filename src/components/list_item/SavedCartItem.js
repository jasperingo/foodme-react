
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { copyIcon } from "../../assets/icons";
import { useCopyText } from "../../hooks/viewHook";

export default function SavedCartItem({ cart: { id, code, title } }) {

  const { t } = useTranslation();

  const copy = useCopyText();

  function copyCode() {

      copy(code);
  
  }

  //const history = useHistory()

  // const { 
  //   user: { user },
  //   cartDispatch,
  //   savedCartsDispatch
  // } = useAppContext();

  //const [dialog, setDialog] = useState(null);

  //const api = new SavedCartApi(user.api_token);

  //

  // function openCart() {
  //   setDialog(null);
  //   // api.get(code)
  //   //   .then((res)=> {
  //   //     cartDispatch({
  //   //       type: CART.DUMPED,
  //   //       payload: res.data
  //   //     });
  //   //     history.push('/cart');
  //   //   })
  //   //   .catch(()=> {
  //   //     setDialog({
  //   //       body: {
  //   //         layout() {
  //   //           return <Reload action={openCart} />
  //   //         }
  //   //       },
  //   //       negativeButton: {
  //   //         text: '_extra.Cancel',
  //   //         action() {
  //   //           setDialog(null);
  //   //         }
  //   //       }
  //   //     });
  //   //   });
  // }
  
  // function confirmDeleteCart() {
    
  //   setDialog({
  //     body: '_cart._confirm_saved_cart_delete',
  //     positiveButton: {
  //       text: '_extra.Yes',
  //       action() {
  //         deleteCart();
  //       }
  //     },
  //     negativeButton: {
  //       text: '_extra.No',
  //       action() {
  //         setDialog(null);
  //       }
  //     }
  //   });
  // }

  // function deleteCart() {
    
  //   setDialog(null);

  //   // api.delete(code)
  //   //   .then(()=> {
  //   //     setDialog(null);
  //   //     savedCartsDispatch({
  //   //       type: SAVED_CART.DELETED,
  //   //       payload: code
  //   //     });
  //   //   })
  //   //   .catch(()=> {
  //   //     setDialog({
  //   //       body: '_errors.Something_went_wrong',
  //   //       negativeButton: {
  //   //         text: '_extra.Cancel',
  //   //         action() {
  //   //           setDialog(null);
  //   //         }
  //   //       }
  //   //     });
  //   //   });
  // }

  return (
    <li>
      <Link to={`/saved-cart/${id}`} className="block mb-4 py-2 rounded md:shadow md:px-2 hover:bg-color-gray-h">
        <div className="text-lg font-bold mb-1 text-color-primary">{ code }</div>
        <div className="flex items-center">
          <div className="flex-grow">{ title }</div>
          <button onClick={copyCode} className="p-1 hover:bg-color-gray-h">
            <Icon path={copyIcon} className="w-5 h-5" />
            <span className="sr-only">{ t('_cart.Copy_code') }</span>
          </button>
        </div>
      </Link>
    </li>
  );
}
