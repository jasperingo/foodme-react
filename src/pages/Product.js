
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { API_URL, useAppContext } from '../context/AppContext';
import { FETCH_STATUSES, PRODUCT, CART } from '../context/AppActions';
import { /*useListRender,*/ useDataRender, useMoneyFormat } from '../context/AppHooks';
import StoreItem from '../components/StoreItem';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import QuantityChooser from '../components/QuantityChooser';
import AlertDialog from '../components/AlertDialog';


const getProductFetchStatusAction = (payload) => ({
  type: PRODUCT.FETCH_STATUS_CHANGED,
  payload
});


function H4Heading({ text }) {

  const { t } = useTranslation();

  return (<h3 className="font-bold mb-1">{ t(text) }</h3>);
}

function ProductProfile({ product }) {

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

        { dialog && 
          <AlertDialog 
            body={dialog.body} 
            positiveButton={dialog.positiveButton} 
            negativeButton={dialog.negativeButton} 
            /> 
        }

        <div className="font-bold text-2xl text-color-primary mb-2">{ useMoneyFormat(product.price) }</div>

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
          <H4Heading text="Description" />
          <p className="max-h-40 overflow-auto">{ product.description }</p>
        </div>

      </div>
    </>
  );
}

export default function Product() {

  const pID = parseInt(useParams().pID);

  //const { t } = useTranslation();

  const { product: {
    product: {
      product,
      productFetchStatus
    },
    //reviews,
    //related
  }, productDispatch } = useAppContext();
  
  useEffect(()=> {
    async function fetchProduct() {

      if (productFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}product.json?id=${pID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        data.data.id = pID;

        productDispatch({
          type: PRODUCT.FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    if (product !== null && pID !== product.id) {
      productDispatch({
        type: PRODUCT.UNFETCH
      });
    }

    fetchProduct(); 

  }, [pID, product, productFetchStatus, productDispatch]);

  function refetchProduct() {
    if (productFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <div className="md:container mx-auto">
        
        <div className="lg:flex lg:items-start lg:gap-2">
          { 
            useDataRender(
              product, 
              productFetchStatus,
              ()=> <ProductProfile product={product} />,
              (k)=> <div className="container-x"> <Loading /> </div>, 
              (k)=> <div className="container-x"> <Reload action={refetchProduct} /> </div>,
            )
          }
        </div>

        <div className="md:flex md:items-start md:gap-2">
          { 
            product && 
            <div className="container-x md:w-1/6">
              <H4Heading text="_store.Store" />
              <StoreItem store={ product.store } />   
            </div>
          }

          { 
            product && 
            <div className="container-x flex-grow md:w-1/2">
              <H4Heading text="_review.Reviews" />
              <div>
                LOADING...
              </div>
            </div>
          }

        </div>

        { 
          product && 
          <div className="container-x py-4">
            <H4Heading text="_product.Related_products" />
            <div>
              LOADING...
            </div> 
          </div>
        }
      </div>

    </section>
  );
}

