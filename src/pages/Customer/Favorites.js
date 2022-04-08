
import React, { useEffect, useCallback } from 'react';
import ProductList from '../../components/list/ProductList';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerFavoriteList } from '../../hooks/customer/customerFavoriteListHook';
import { useHeader } from '../../hooks/headerHook';

export default function Favorites() {

  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${customer.user.name} - Favorites`,
    headerTitle: "_extra.Favorites"
  });

  const [
    fetchCustomerProducts, 
    products, 
    productsLoading, 
    productsLoaded, 
    productsError,
    productsPage, 
    productsNumberOfPages, 
    refreshCustomerProducts
  ] = useCustomerFavoriteList(customer.id, customerToken);

  const favoritesFetch = useCallback(
    function() {
      if (!productsLoading) 
        fetchCustomerProducts();
    },
    [productsLoading, fetchCustomerProducts]
  );

  useEffect(
    function() { if (!productsLoaded) favoritesFetch(); },
    [productsLoaded, favoritesFetch]
  );

  return (
    <section>
      <div className="container-x">
        
        <ProductList
          products={products.map(i=> i.product)}
          productsPage={productsPage}
          productsError={productsError}
          productsLoaded={productsLoaded}
          productsLoading={productsLoading}
          productsNumberOfPages={productsNumberOfPages}
          fetchProducts={favoritesFetch}
          refreshList={refreshCustomerProducts}
          />

      </div>
    </section>
  );
}
