
import React from 'react';
import AddButton from '../../components/AddButton';
import ProductList from '../../components/profile/section/ProductList';
import { useAppContext } from '../../hooks/contextHook';
import { useStoreProductList } from '../../hooks/store/storeProductListHook';


export default function Products() {

  const {
    store: { 
      store: {
        storeToken
      }
    } 
  } = useAppContext();

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch
  ] = useStoreProductList(storeToken);

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_product.Add_product" href="/product/create" />

      </div>

      <ProductList 
        products={products}
        productsFetchStatus={productsFetchStatus}
        productsPage={productsPage}
        productsNumberOfPages={productsNumberOfPages}
        refetch={refetch}
        />
      
    </section>
  );
}

