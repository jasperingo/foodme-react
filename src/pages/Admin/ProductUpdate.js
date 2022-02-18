
import React from 'react';
import Forbidden from '../../components/Forbidden';
import RecommendForm from '../../components/form/RecommendForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useProductRecommendedUpdate } from '../../hooks/product/productRecommendedUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function ProductUpdate() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    product, 
    productFetchStatus, 
    refetch
  ] = useProductFetch(adminToken);

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Edit_product',
  });

  const [
    recommendedOnSubmit,
    recommendedDialog, 
    recommendedFormError, 
    recommendedFormSuccess, 
    recommendedValueError
  ] = useProductRecommendedUpdate(product?.id, adminToken);
 
  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            productFetchStatus,
            ()=> (
              <>
                <RecommendForm 
                  recommended={product.recommended}
                  onSubmit={recommendedOnSubmit}
                  dialog={recommendedDialog}
                  formError={recommendedFormError}
                  formSuccess={recommendedFormSuccess}
                  recommendedError={recommendedValueError}
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
