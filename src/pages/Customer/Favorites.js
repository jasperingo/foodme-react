
import React, { useEffect, useCallback } from 'react';
import ProductList from '../../components/list/ProductList';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
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
    setCustomerProductsError, 
    refreshCustomerProducts
  ] = useCustomerFavoriteList(customer.id, customerToken);

  const fetch = useCallback(
    function() {
      if (!window.navigator.onLine && productsError === null)
        setCustomerProductsError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
      else if (window.navigator.onLine && !productsLoading) 
        fetchCustomerProducts();
    },
    [productsError, productsLoading, fetchCustomerProducts, setCustomerProductsError]
  );

  useEffect(
    function() { if (!productsLoaded) fetch(); },
    [productsLoaded, fetch]
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
          getNextPage={fetch}
          retryFetch={()=> setCustomerProductsError(null)}
          refreshList={refreshCustomerProducts}
          />

      </div>
    </section>
  );
}
