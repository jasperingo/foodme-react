
import React, { useEffect } from 'react';
import AddButton from '../../components/AddButton';
import ProductList from '../../components/list/ProductList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreProductList } from '../../hooks/store/storeProductListHook';

export default function Products() {

  const {
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Products`,
    topNavPaths: ['/messages', '/cart']
  });

  const [
    fetchStoreProducts,
    products, 
    productsLoading,
    productsError,
    productsLoaded,
    productsPage, 
    productsNumberOfPages,
    refreshStoreProducts
  ] = useStoreProductList(storeToken);

  useEffect(
    function() {
      if (!productsLoaded && productsError === null) 
        fetchStoreProducts(store.id); 
    },
    [store.id, productsError, productsLoaded, fetchStoreProducts]
  );

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_product.Add_product" href="/product/create" />

      </div>

      <ProductList 
        products={products}
        productsPage={productsPage}
        productsError={productsError}
        productsLoaded={productsLoaded}
        productsLoading={productsLoading}
        productsNumberOfPages={productsNumberOfPages}
        refreshList={refreshStoreProducts}
        fetchProducts={()=> fetchStoreProducts(store.id)}
        />
      
    </section>
  );
}

