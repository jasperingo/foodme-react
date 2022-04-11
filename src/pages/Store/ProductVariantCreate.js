
import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ProductVariantForm from '../../components/form/ProductVariantForm';
import { useHeader } from '../../hooks/headerHook';
import { useProductVariantCreate } from '../../hooks/product/productVariantCreateHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function ProductVariantCreate() {

  const history = useHistory();

  const [product] = useURLQuery(['product']);

  useHeader({ 
    title: `Create Product variant - DailyNeeds`,
    headerTitle: '_product.Add_product_variant'
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
  ] = useProductVariantCreate(Number(product));

  useEffect(
    function() {
      if (formSuccess !== null) 
        history.replace(`/product/${product}`);
    },
    [product, history, formSuccess]
  );
  
  if (!product) {
    return <Redirect to="/products" />
  }
  
  return (
    <section>
      <div className="container-x">
        <ProductVariantForm 
          productVariant={{}}
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
      </div>
    </section>
  );
}
