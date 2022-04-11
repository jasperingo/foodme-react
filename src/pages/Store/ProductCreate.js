
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import ProductForm from '../../components/form/ProductForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductCreate } from '../../hooks/product/productCreateHook';
import { useProductPhotoUpdate } from '../../hooks/product/productPhotoUpdateHook';

export default function ProductCreate() {

  useHeader({ 
    title: `Create Product - DailyNeeds`,
    headerTitle: '_product.Add_product'
  });

  const [
    fetchProductCategories, 
    productCategories,
    productCategoriesLoading,
    productCategoriesLoaded,
    productCategoriesError
  ] = useProductCategoryList();

  const [
    onSubmit,  
    id,
    loading, 
    formError, 
    titleError, 
    categoryError, 
    descriptionError
  ] = useProductCreate();

  const [
    submitPhoto,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useProductPhotoUpdate();

  const history = useHistory();

  useEffect(
    function() {
      if (id > 0 && photo !== null && !photoUploaded && photoFormError === null)
        submitPhoto(id, false);
      else if (id > 0) 
        history.push(`/product/${id}`);
    }, 
    [id, history, photo, photoUploaded, photoFormError, submitPhoto]
  );
  
  useEffect(
    function() { 
      if (!productCategoriesLoaded && productCategoriesError === null) 
        fetchProductCategories();
    },
    [productCategoriesLoaded, productCategoriesError, fetchProductCategories]
  );

  return (
    <section>
      <div className="container-x">
        
        { 
          productCategoriesLoaded &&
          <ProductForm 
            categories={productCategories}
            product={{ photo: { href: '/photos/default.jpg' } }}
            onSubmit={onSubmit}
            onPhotoChoose={setPhoto}
            photoUploaded={photoUploaded}
            dialog={loading || photoLoading}
            formError={formError}
            titleError={titleError}
            categoryError={categoryError}
            descriptionError={descriptionError}
            />
        }
        
        { productCategoriesLoading && <Loading /> }

        { 
          productCategoriesError ===  NetworkErrorCodes.NOT_FOUND && 
          <NotFound /> 
        }

        { 
          productCategoriesError === NetworkErrorCodes.FORBIDDEN && 
          <Forbidden /> 
        }

        { 
          productCategoriesError === NetworkErrorCodes.UNKNOWN_ERROR && 
          <Reload action={fetchProductCategories} /> 
        }

        { 
          productCategoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION && 
          <Reload message="_errors.No_netowrk_connection" action={fetchProductCategories} /> 
        }

      </div>
    </section>
  );
}
