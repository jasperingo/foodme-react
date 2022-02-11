
import React from 'react';
import Forbidden from '../../components/Forbidden';
import ProductVariantDeleteForm from '../../components/form/ProductVariantDeleteForm';
import ProductVariantForm from '../../components/form/ProductVariantForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductVariantDelete } from '../../hooks/product/productVariantDeleteHook';
import { useProductVariantFetch } from '../../hooks/product/productVariantFetchHook';
import { useProductVariantUpdate } from '../../hooks/product/productVariantUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function ProductVariantUpdate() {

  const {
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

  const [
    productVariant, 
    productVariantFetchStatus, 
    refetch
  ] = useProductVariantFetch(storeToken);

  useHeader({ 
    title: `${productVariant?.name ?? 'Loading...'} - Product Variant`,
    headerTitle: '_product.Edit_product_variant',
  });

  const [
    onSubmit, 
    dialog, 
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
    deleteDialog, 
    deleteFormSuccess, 
    deleteFormError
  ] = useProductVariantDelete();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            productVariantFetchStatus,
            ()=> (
              <>
                <ProductVariantForm 
                  productVariant={productVariant}
                  onSubmit={onSubmit}
                  dialog={dialog}
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
                  dialog={deleteDialog}
                  formError={deleteFormError}
                  formSuccess={deleteFormSuccess}
                  product={productVariant.product_id}
                  />
              </>
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
