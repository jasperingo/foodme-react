
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductApi from '../../api/ProductApi';
import Loading from '../../components/Loading';
import ProductForm from '../../components/ProductForm';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getProductFetchStatusAction, PRODUCT } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function ProductUpdate() {

  const pID = parseInt(useParams().ID);

  const { user: { user }, 
    product: {
      product: {
        product,
        productFetchStatus
      }
  }, productDispatch } = useAppContext();

  useEffect(()=> {

    if (product !== null && pID !== product.id) {
      productDispatch({ type: PRODUCT.UNFETCH });
    } else if (product !== null && productFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi(user.api_token);
      api.get(pID, productDispatch);
    }

  }, [pID, user, product, productFetchStatus, productDispatch]);

  function refetchProduct() {
    if (productFetchStatus !== FETCH_STATUSES.LOADING) 
      productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        { 
          useDataRender(
            product, 
            productFetchStatus,
            ()=> <ProductForm type={ProductForm.UPDATE} product={product} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchProduct} />,
          )
        }
      </div>
    </section>
  );
}
