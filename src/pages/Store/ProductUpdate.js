
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import ProductDeleteForm from '../../components/form/ProductDeleteForm';
import ProductForm from '../../components/form/ProductForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductDelete } from '../../hooks/product/productDeleteHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useProductPhotoUpdate } from '../../hooks/product/productPhotoUpdateHook';
import { useProductUpdate } from '../../hooks/product/productUpdateHook';

export default function ProductUpdate() {

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
    fetchProduct,
    product,
    productLoading,
    productError,
    productID,
    unfetchProduct
  ] = useProductFetch(storeToken);

  const [
    fetchProductCategories, 
    productCategories,
    productCategoriesLoading,
    productCategoriesLoaded,
    productCategoriesError
  ] = useProductCategoryList();

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Edit_product',
  });

  const [
    onSubmit, 
    loading,
    success, 
    setSuccess,
    formError, 
    formSuccess, 
    titleError,
    categoryError, 
    descriptionError
  ] = useProductUpdate();

  const [
    submitPhoto,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useProductPhotoUpdate();

  const [
    onDeleteSubmit, 
    deleteDialog, 
    deleteFormSuccess, 
    deleteFormError
  ] = useProductDelete();

  useEffect(
    function() { 
      if (!productCategoriesLoaded && productCategoriesError === null) 
        fetchProductCategories();
    },
    [productCategoriesLoaded, productCategoriesError, fetchProductCategories]
  );

  useEffect(
    function() {
      if ((product !== null || productError !== null) && productID !== ID) 
        unfetchProduct();
      else if (product === null && productError === null)
        fetchProduct(ID);
    },
    [ID, product, productError, productID, fetchProduct, unfetchProduct]
  );

  useEffect(
    function() {
      if (success && photo !== null && !photoUploaded && photoFormError === null)
        submitPhoto(product.id, true);
      else if (success) 
        setSuccess(false);
    }, 
    [product?.id, success, photo, photoUploaded, photoFormError, submitPhoto, setSuccess]
  );

  useEffect(
    function() {
      if (deleteFormSuccess !== null) history.push('/products');
    }, 
    [deleteFormSuccess, history]
  );

  function retryLoad() {
    if (product === null) fetchProduct(ID);
    if (!productCategoriesLoaded) fetchProductCategories();
  }
 
  return (
    <section>
      <div className="container-x">
        {
          (product !== null && productCategoriesLoaded) &&
          <>
            <ProductForm 
              categories={productCategories}
              product={product}
              onSubmit={onSubmit}
              onPhotoChoose={setPhoto}
              photoUploaded={photoUploaded}
              dialog={loading || photoLoading}
              formError={formError}
              formSuccess={formSuccess}
              titleError={titleError}
              categoryError={categoryError}
              descriptionError={descriptionError}
              />

            <ProductDeleteForm
              onSubmit={onDeleteSubmit}
              dialog={deleteDialog}
              formError={deleteFormError}
              />
          </>
        }
        
        { (productLoading || productCategoriesLoading) && <Loading /> }

        { productError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { productError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { 
          (productError === NetworkErrorCodes.UNKNOWN_ERROR || productCategoriesError === NetworkErrorCodes.UNKNOWN_ERROR) && 
          <Reload action={retryLoad} /> 
        }

        { 
          (productError === NetworkErrorCodes.NO_NETWORK_CONNECTION || productCategoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION) && 
          <Reload message="_errors.No_netowrk_connection" action={retryLoad} /> 
        }
        
      </div>
    </section>
  );
}
