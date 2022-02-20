
import Icon from "@mdi/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { categoryIcon, editIcon, favoritedIcon, favoriteIcon, notFoundIcon, recommendedIcon, weightIcon } from "../../assets/icons";
import { CART } from "../../context/actions/cartActions";
import { useAppContext } from "../../hooks/contextHook";
import { useMoneyFormat } from "../../hooks/viewHook";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import AddButton from "../AddButton";
import AlertDialog from "../dialog/AlertDialog";
import LoadingDialog from "../dialog/LoadingDialog";
import H4Heading from "../H4Heading";
import QuantityChooser from "../QuantityChooser";


export default function ProductProfile(
  { 
    isCustomer, 
    isStore,
    isAdmin,
    onFavoriteSubmit,
    onUnfavoriteSubmit,
    customerToken,
    product: {
      id,
      photo,
      title,
      description,
      sub_category,
      recommended,
      favorites,
      store,
      product_variants
    }
  }
) {

  const { t } = useTranslation();

  const history = useHistory();

  const location = useLocation();

  const {
    cart: {
      cartDispatch,
      cart: {
        cartItems
      }
    }
  } = useAppContext();
  
  const [dialog, setDialog] = useState(null);

  const [loadingDialog, setLoadingDialog] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [variant, setVariant] = useState(product_variants[0]);

  const price = useMoneyFormat(variant?.price || 0);
  
  function onQuantityButtonClicked(value) {
    value = (quantity || 1) + value;
    if (value < 1) {
      setQuantity(1);
    } else if (value > variant.quantity) {
      setQuantity(variant.quantity);
    } else {
      setQuantity(value);
    }
  }

  function onAddToCart() {

    const item = {
      quantity,
      product_variant: variant,
      amount: (variant.price * quantity),
      product: { id, photo, title, store }
    };

    if (cartItems.length > 0 && cartItems[0].product.store.id !== store.id) {

      setDialog({
        body: '_cart._cart_item_store_conflict_resolve_confirm',
        positiveButton: {
          text: '_extra.Yes',
          action() {
            cartDispatch({
              type: CART.ITEMS_REPLACED,
              payload: {
                list: [item],
                fetchStatus: FETCH_STATUSES.DONE
              }
            });
            setDialog(null);
          }
        },
        negativeButton: {
          text: '_extra.No',
          action() {
            setDialog(null);
          }
        }
      });

    } else {

      cartDispatch({
        type: CART.ITEM_ADDED,
        payload: {
          item,
          fetchStatus: FETCH_STATUSES.DONE
        }
      });

      setDialog({
        body: '_product.Product_has_been_added_to_cart',
        positiveButton: {
          text: '_extra.Done',
          action() {
            setDialog(null);
          }
        }
      });
    }
  }

  function favoriteProduct() {

    if (customerToken === null) {

      history.push(`/login?redirect_to=${encodeURIComponent(location.pathname)}`);

    } else {

      setLoadingDialog(true);
      onFavoriteSubmit({
        
        onSuccess() {
          setLoadingDialog(false);
          setDialog({
            body: '_product.Product_added_to_favorites',
            positiveButton: {
              text: '_extra.Done',
              action() {
                setDialog(null);
              }
            }
          });
        },

        onError(message) {
          setLoadingDialog(false);
          setDialog({
            body: message,
            positiveButton: {
              text: '_extra.Done',
              action() {
                setDialog(null);
              }
            }
          });
        }

      });
    }
  }

  function unfavoriteProduct() {
    setLoadingDialog(true);
    onUnfavoriteSubmit({
      
      onSuccess() {
        setLoadingDialog(false);
        setDialog({
          body: '_product.Product_removed_from_favorites',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
      },

      onError(message) {
        setLoadingDialog(false);
        setDialog({
          body: message,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
      }

    });
  }
  
  function confirmUnfavoriteProduct() {
    setDialog({
      body: '_product._remove_product_from_favorites_confirm_message',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          unfavoriteProduct();
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

  return (
    <div className="md:container mx-auto">
      <div className="sm:mt-4 lg:flex lg:items-start lg:gap-2">

        <div className="lg:w-1/3">
          <div className="container mx-auto">
            <img 
              src={photo.href}
              alt={title}
              className="h-60 w-full lg:h-96 sm:rounded"
              />
          </div>
        </div>

        <div className="container-x pt-4 flex-grow lg:w-1/2 lg:pt-0">

          { dialog && <AlertDialog dialog={dialog} /> }

          { loadingDialog && <LoadingDialog /> }

          <div className="flex mb-2">
            <h3 className="text-xl flex-grow">{ title }</h3>
            <div>
              {
                isCustomer && (customerToken === null || !favorites?.length) && 
                <button onClick={favoriteProduct}>
                  <span className="sr-only">{ t('_product.Add_product_to_favorites') }</span>
                  <Icon path={favoriteIcon} className="w-7 h-7 text-red-500" />
                </button>
              }

              {
                isCustomer && customerToken !== null && favorites?.length > 0 && 
                <button onClick={confirmUnfavoriteProduct}>
                  <span className="sr-only">{ t('_product.Remove_product_from_favorites') }</span>
                  <Icon path={favoritedIcon} className="w-7 h-7 text-red-500" />
                </button>
              }

              { 
                (isStore || isAdmin) && 
                <Link to={`/product/${id}/update`}>
                  <span className="sr-only">{ t('_product.Edit_product') }</span>
                  <Icon path={editIcon} className="w-7 h-7 text-color-primary" />
                </Link>
              }
            </div>
          </div>
          
          <div className="flex gap-1 items-center text-color-gray text-sm mb-3">
            <Icon path={categoryIcon} className="w-5 h-5" />
            <span>{ sub_category.name }, { sub_category.category.name }</span>
          </div>

          {
            recommended && 
            <div className="flex gap-1 items-center text-color-primary text-sm mb-3">
              <Icon path={recommendedIcon} className="w-5 h-5" />
              <span>{ t('_product.Recommended_product') }</span>
            </div>
          }

          { 
            isStore && 
            <AddButton text="_product.Add_product_variant" href={`/product-variant/create?product=${id}`} />
          }
          
          <ul className="flex gap-2 overflow-x-auto mb-3">
            {
              product_variants.map(v=> (
                <li key={`product-variant-${v.id}`}>
                  <button 
                    onClick={()=> setVariant(product_variants.find(theVar=> v.id === theVar.id))}
                    className={`px-2 rounded ${v.id === variant.id ? 'btn-color-primary' : 'bg-color-gray hover:bg-color-gray-h'}`}
                    >
                    { v.name }
                  </button>
                </li>
              ))
            }
          </ul>
          
          {
            variant && 
            <>
              { 
                isStore && 
                <Link 
                  to={`/product-variant/${variant.id}`}
                  className="inline-flex gap-1 items-center my-2 text-sm btn-color-primary px-1 rounded"
                  >
                  <Icon path={editIcon} className="w-4 h-4" />
                  <span>{ t('_product.Edit_product_variant') }</span>
                </Link>
              }

              <div className="font-bold text-2xl text-color-primary mb-2 flex-grow">{ price }</div>

              <div className="flex gap-2 items-center flex-wrap mb-3">
                {
                  (variant.available && (isCustomer || isStore)) && 
                  <>
                    <div className="text-sm">{ t('_product.Quantity') }</div>
                    <QuantityChooser
                      quantity={quantity}
                      onQuantityChanged={onQuantityButtonClicked}
                      />
                  </>
                }
                <div className="bg-color-gray px-2 rounded text-sm">
                  { t('_product._unit_quauntity_available', { unit: variant.quantity }) }
                </div>
              </div>
              
              <div className="flex gap-1 items-center text-color-gray text-sm mb-2">
                <Icon path={weightIcon} className="w-5 h-5" />
                <span>{ variant.weight } kg</span>
              </div>
              
              {
                variant.available ?
                (isCustomer || isStore) && 
                  <button 
                    onClick={onAddToCart}
                    className="w-full btn-color-primary my-4 py-3 px-5 font-bold rounded lg:w-auto"
                    >
                    { t('_product.Add_to_cart') }
                  </button>
                :
                <div className="flex gap-2 w-full bg-red-500 my-4 py-3 px-5 rounded lg:w-auto">
                  <Icon path={notFoundIcon} className="w-6 h-6" />
                  <span>{ t('_product._not_available_message') }</span>
                </div>
              }
              
            </>
          }

        </div>

      </div>
      
      <div className="container-x mb-4 lg:my-5 lg:flex lg:items-start lg:gap-10">

        <div className="md:shadow rounded mb-3 flex-grow md:p-2">
          <H4Heading text="_extra.Description" />
          <p className="max-h-40 overflow-auto">{ description }</p>
        </div>

        <div className="md:p-2 md:shadow">
          <H4Heading text="_store.Store" />
          <Link 
            to={isStore ? '/profile' : `/store/${store.id}`} 
            className="flex gap-2 bg-color items-center hover:bg-color-gray-h md:block"
            >
            <img 
              src={ store.user.photo.href } 
              alt={ store.user.name } 
              className="w-12 h-12 border rounded block md:w-full md:h-36" 
              />
            <div className="font-bold flex-grow md:p-2">{ store.user.name }</div>
          </Link>   
        </div>

      </div>

    </div>
  );
}

