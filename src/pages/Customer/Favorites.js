
import React, { useEffect } from 'react';
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
  ] = useCustomerFavoriteList(customerToken);

  useEffect(
    function() { 
      if (!productsLoaded && productsError === null) 
        fetchCustomerProducts(customer.id); 
    },
    [customer.id, productsLoaded, productsError, fetchCustomerProducts]
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
          fetchProducts={()=> fetchCustomerProducts(customer.id)}
          refreshList={refreshCustomerProducts}
          />

      </div>
    </section>
  );
}
