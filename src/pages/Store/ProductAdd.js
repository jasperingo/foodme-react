
import React from 'react';
import ProductForm from '../../components/ProductForm';

export default function ProductAdd() {

  const product = {
    photo: 'product.jpg'
  };

  return (
    <section>
      <div className="container-x">
        <ProductForm type={ProductForm.ADD} product={product} />
      </div>
    </section>
  );
}
