
import React from 'react';
import Forbidden from '../../components/Forbidden';
import ProductForm from '../../components/form/ProductForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useProductUpdate } from '../../hooks/product/productUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function ProductUpdate() {

  const {
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

  const [
    product, 
    productFetchStatus, 
    refetch
  ] = useProductFetch(storeToken);

  const [
    products, 
    productsFetchStatus, 
    refetchProducts
  ] = useProductCategoryList(true);

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Edit_product',
  });

  const [
    onSubmit, 
    onPhotoChoose,
    photoUploaded,  
    dialog, 
    formError, 
    formSuccess, 
    titleError, 
    categoryError, 
    descriptionError
  ] = useProductUpdate();

  function retryLoad() {
    refetch();
    refetchProducts();
  }
 
  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            [productsFetchStatus, productFetchStatus],
            ()=> (
              <ProductForm 
                categories={products}
                product={product}
                onSubmit={onSubmit}
                onPhotoChoose={onPhotoChoose}
                photoUploaded={photoUploaded}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                titleError={titleError}
                categoryError={categoryError}
                descriptionError={descriptionError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={retryLoad} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
