
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import ProductVariantDeleteForm from '../../components/form/ProductVariantDeleteForm';
import ProductVariantForm from '../../components/form/ProductVariantForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductVariantDelete } from '../../hooks/product/productVariantDeleteHook';
import { useProductVariantFetch } from '../../hooks/product/productVariantFetchHook';
import { useProductVariantUpdate } from '../../hooks/product/productVariantUpdateHook';

export default function ProductVariantUpdate() {

  const { ID } = useParams();

  const history = useHistory();

  const {
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

  const [
    fetchProductVariant,
    productVariant,
    productVariantLoading,
    productVariantError,
    productVariantID,
    unfetchProductVariant
  ] = useProductVariantFetch(storeToken);

  useHeader({ 
    title: `${productVariant?.name ?? 'Loading...'} - Product Variant`,
    headerTitle: '_product.Edit_product_variant',
  });

  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    nameError,
    priceError,
    quantityError,
    weightError,
    availableError
  ] = useProductVariantUpdate();

  const [
    onDeleteSubmit, 
    deleteLoading, 
    deleteFormSuccess, 
    deleteFormError
  ] = useProductVariantDelete();

  useEffect(
    function() {
      if ((productVariant !== null || productVariantError !== null) && productVariantID !== ID) 
        unfetchProductVariant();
      else if (productVariant === null && productVariantError === null)
        fetchProductVariant(ID);
    },
    [ID, productVariant, productVariantError, productVariantID, fetchProductVariant, unfetchProductVariant]
  );

  useEffect(
    function() {
      if (deleteFormSuccess !== null) 
        history.push(`/product/${productVariant.product_id}`);
    }, 
    [deleteFormSuccess, productVariant, history]
  );

  return (
    <section>
      <div className="container-x">

        { 
          productVariant !== null && 
          <>
            <ProductVariantForm 
              productVariant={productVariant}
              onSubmit={onSubmit}
              dialog={loading}
              formError={formError}
              formSuccess={formSuccess}
              nameError={nameError}
              priceError={priceError}
              quantityError={quantityError}
              weightError={weightError}
              availableError={availableError}
              />
            
            <ProductVariantDeleteForm 
              onSubmit={onDeleteSubmit}
              dialog={deleteLoading}
              formError={deleteFormError}
              formSuccess={deleteFormSuccess}
              product={productVariant.product_id}
              />
          </>
        }

        { productVariantLoading && <Loading /> }

        { 
          productVariantError === NetworkErrorCodes.NOT_FOUND && 
          <NotFound /> 
        }

        { 
          productVariantError === NetworkErrorCodes.FORBIDDEN && 
          <Forbidden /> 
        }

        { 
          productVariantError === NetworkErrorCodes.UNKNOWN_ERROR && 
          <Reload action={()=> fetchProductVariant(ID)} /> 
        }

        { 
          productVariantError === NetworkErrorCodes.NO_NETWORK_CONNECTION && 
          <Reload message="_errors.No_netowrk_connection" action={()=> fetchProductVariant(ID)} /> 
        }
      </div>
    </section>
  );
}
