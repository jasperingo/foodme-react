
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductForm from '../../components/form/ProductForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductCreate } from '../../hooks/product/productCreateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function ProductCreate() {

  useHeader({ 
    title: `Create Product - DailyNeeds`,
    headerTitle: '_product.Add_product'
  });

  const [
    products, 
    productsFetchStatus, 
    refetchProducts
  ] = useProductCategoryList(true);

  const [
    onSubmit, 
    onPhotoChoose,
    photoUploaded,  
    id,
    dialog, 
    formError, 
    formSuccess, 
    titleError, 
    categoryError, 
    descriptionError
  ] = useProductCreate();

  const history = useHistory();

  useEffect(
    ()=> {
      if (id) {
        history.push(`/product/${id}`);
      }
    }, 
    [id, history]
  );

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            productsFetchStatus,
            ()=> (
              <ProductForm 
                categories={products}
                product={{ photo: { href: '/photos/default.jpg' } }}
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
            ()=> <Reload action={refetchProducts} />,
          )
        }
      </div>
    </section>
  );
}
