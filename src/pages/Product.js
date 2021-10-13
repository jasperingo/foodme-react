
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { API_URL, useAppContext } from '../context/AppContext';
import { FETCH_STATUSES, PRODUCT } from '../context/AppActions';
import { /*useListRender,*/ useDataRender } from '../context/AppHooks';
import StoreItem from '../components/StoreItem';
import SubHeader from '../components/SubHeader';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import AddRoundIcon from '../icons/AddRoundIcon';
import RemoveRoundIcon from '../icons/RemoveRoundIcon';

const getProductFetchStatusAction = (payload) => ({
  type: PRODUCT.PRODUCT_FETCH_STATUS_CHANGED,
  payload
});

function QuantityChangeButton({ text, Icon, negative, onButtonClicked }) {

  const { t } = useTranslation();

  return (
    <button onClick={()=> onButtonClicked(negative?-1:1)}>
      <Icon classList="fill-current text-color-primary" />
      <span className="sr-only">{ t(text) }</span>
    </button>
  );
}

function H4Heading({ text }) {

  const { t } = useTranslation();

  return (<h3 className="font-bold mb-1">{ t(text) }</h3>);
}

export default function Product() {

  const { pID } = useParams();

  const { t } = useTranslation();

  const { product: {
    product: {
      product,
      productFetchStatus
    },
    //reviews,
    //related
  }, productDispatch } = useAppContext();

  const [quantity, setQuantity] = useState(1);

  function onQuantityButtonClicked(value) {
    value = quantity+value;
    setQuantity(value<1?1:value)
  }

  function onAddToCart() {
    alert('Adding to  cart...');
  }
  
  useEffect(()=> {
    async function fetchProduct() {

      if (productFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}product.json?id=${pID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];

        productDispatch({
          type: PRODUCT.PRODUCT_FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProduct(); 

  }, [pID, productFetchStatus, productDispatch]);

  function refetchProduct() {
    if (productFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <SubHeader title="Product" />

      <div className="md:container mx-auto">
        
        <div className="lg:flex lg:items-start lg:gap-2">
          { 
            useDataRender(
              product, 
              productFetchStatus,
              (item, i)=> (
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

                    <div className="font-bold text-2xl text-color-primary mb-2">&#8358; { product.price }</div>

                    <h3 className="text-xl mb-2">{ product.title }</h3>

                    <div className="text-color-gray text-sm mb-2">{ product.sub_title }</div>
                    
                    <div className="mb-2">
                      <div className="text-sm mb-1">{ t('_product.Quantity') }</div>
                      <div className="flex items-center">
                        <QuantityChangeButton 
                          negative={true}
                          Icon={RemoveRoundIcon} 
                          text="_product.Decrease_quantity" 
                          onButtonClicked={onQuantityButtonClicked}
                          />
                        <input 
                          type="number"
                          value={quantity}
                          onChange={(e)=> setQuantity(parseInt(e.target.value) || 1)}
                          className="bg-color-gray mx-2 p-1 rounded w-20"
                          />
                        <QuantityChangeButton 
                          negative={false}
                          Icon={AddRoundIcon}
                          text="_product.Increase_quantity"  
                          onButtonClicked={onQuantityButtonClicked}
                          />
                        <div className="ml-2 font-bold">{ product.unit }</div>
                      </div>
                    </div>

                    <button 
                      onClick={onAddToCart}
                      className="w-full bg-color-primary text-white my-4 py-3 px-5 font-bold rounded lg:w-auto"
                    >
                      { t('_product.Add_to_cart') }
                    </button>

                    <div className="p-2 border rounded">
                      <H4Heading text="Description" />
                      <p className="max-h-40 overflow-auto">{ product.description }</p>
                    </div>

                  </div>
                </>
              ),
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

