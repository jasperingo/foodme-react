
import Icon from "@mdi/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomerApp from "../apps/CustomerApp";
import StoreApp from "../apps/StoreApp";
import { editIcon, favoriteIcon } from "../assets/icons";
import { CART } from "../context/AppActions";
import { useAppContext } from "../context/AppContext";
import { useDataRender, useMoneyFormat } from "../context/AppHooks";
import AlertDialog from "./AlertDialog";
import H4Heading from "./H4Heading";
import Loading from "./Loading";
import QuantityChooser from "./QuantityChooser";
import Reload from "./Reload";


function ProductProfileView({ product, appType }) {

  const { t } = useTranslation();

  const { cartDispatch } = useAppContext();
  
  const [dialog, setDialog] = useState(null);

  const [quantity, setQuantity] = useState(1);
  
  function onQuantityButtonClicked(value) {
    value = (quantity || 1) + value;
    setQuantity(value < 1 ? 1 : value);
  }

  function onAddToCart() {
    
    cartDispatch({
      type: CART.ITEM_ADDED,
      payload: {
        amount: (product.price*quantity),
        delivery_fee: 200.00,
        unit: product.unit,
        quantity,
        product
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

  function favoriteProduct() {
    alert('Adding product to favourites');
  }

  return(
    <>
      <div className="lg:w-1/3">
        <div className="container mx-auto">
          <img 
            src={`/photos/products/${product.photo}`}
            alt={product.title}
            className="h-60 w-full lg:h-96 sm:rounded"
            />
        </div>
      </div>

      <div className="container-x py-4 flex-grow lg:w-1/2 lg:pt-0">

        { dialog && <AlertDialog dialog={dialog} /> }

        <div className="flex">
          <div className="font-bold text-2xl text-color-primary mb-2 flex-grow">{ useMoneyFormat(product.price) }</div>
          <div>
            {
              appType === CustomerApp.TYPE && <button onClick={favoriteProduct}>
                <span className="sr-only">{ t('_product.Add_product_to_favorites') }</span>
                <Icon path={favoriteIcon} className="w-8 h-8 text-red-500" />
              </button>
            }

            { 
              appType === StoreApp.TYPE && <Link to="/product/add">
                <span className="sr-only">{ t('_product.Edit_product') }</span>
                <Icon path={editIcon} className="w-8 h-8 text-color-primary" />
              </Link>
            }
          </div>
        </div>

        <h3 className="text-xl mb-2">{ product.title }</h3>

        <div className="text-color-gray text-sm mb-2">{ product.sub_title }</div>
        
        <div className="mb-2">
          <div className="text-sm mb-1">{ t('_product.Quantity') }</div>
          <QuantityChooser
            quantity={quantity}
            unit={product.unit} 
            onQuantityChanged={onQuantityButtonClicked}
            />
        </div>

        <button 
          onClick={onAddToCart}
          className="w-full btn-color-primary my-4 py-3 px-5 font-bold rounded lg:w-auto"
        >
          { t('_product.Add_to_cart') }
        </button>

        <div className="p-2 border rounded">
          <H4Heading text="_extra.Description" />
          <p className="max-h-40 overflow-auto">{ product.description }</p>
        </div>

      </div>
    </>
  );
}

export default function ProductProfile({ product, productFetchStatus, appType, refetchProduct }) {

  return (
    <div className="lg:flex lg:items-start lg:gap-2 lg:mt-4">
      { 
        useDataRender(
          product, 
          productFetchStatus,
          ()=> <ProductProfileView product={product} appType={appType} />,
          (k)=> <div className="container-x"> <Loading /> </div>, 
          (k)=> <div className="container-x"> <Reload action={refetchProduct} /> </div>,
        )
      }
    </div>
  );
}

