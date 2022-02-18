
import React from 'react';
import { useHistory } from 'react-router-dom';
import ProductVariantForm from '../../components/form/ProductVariantForm';
import { useHeader } from '../../hooks/headerHook';
import { useProductVariantCreate } from '../../hooks/product/productVariantCreateHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function ProductVariantCreate() {

  const product = useURLQuery().get('product');

  const history = useHistory();

  if (!product) {
    history.replace('/products');
  }

  useHeader({ 
    title: `Create Product variant - DailyNeeds`,
    headerTitle: '_product.Add_product_variant'
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
  ] = useProductVariantCreate();

  return (
    <section>
      <div className="container-x">
        <ProductVariantForm 
          productVariant={{}}
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
      </div>
    </section>
  );
}
