
import React from 'react';
import { productIcon } from '../../assets/icons';
import ScrollList from './ScrollList';
import ProductItem from '../list_item/ProductItem';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import Forbidden from '../Forbidden';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

export default function ProductList(
  { products, productsLoading, productsLoaded, productsError, productsPage, productsNumberOfPages, fetchProducts, refreshList }
) {
  
  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={products}
        nextPage={fetchProducts}
        refreshPage={refreshList}
        hasMore={loadOnScroll(productsPage, productsNumberOfPages, productsError)}
        className="list-x"
        renderDataItem={(item)=> (
          <li key={`product-${item.id}`}> <ProductItem product={item} /> </li>
        )}
        footer={listFooter([
          
          { 
            canRender: productsLoading, 
            render() { 
              return <li key="product-footer" className="list-x-col-span"> <Loading /> </li>;
            }
          },

          { 
            canRender: productsError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="product-footer" className="list-x-col-span"> <Reload action={fetchProducts} /> </li>;
            }
          },

          { 
            canRender: productsLoaded && products.length === 0, 
            render() { 
              return <li key="product-footer" className="list-x-col-span"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>;
            }
          },

          { 
            canRender: productsPage <= productsNumberOfPages, 
            render() { 
              return <li key="product-footer" className="list-x-col-span"> <FetchMoreButton action={fetchProducts} /> </li>;
            }
          },

          { 
            canRender: productsError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="product-footer" className="list-x-col-span"> <NotFound /> </li>;
            }
          },

          { 
            canRender: productsError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="product-footer" className="list-x-col-span"> <Forbidden /> </li>;
            }
          },

          {
            canRender: productsError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="product-footer" className="list-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchProducts} />
                </li>
              );
            }
          },

        ])}
        />

    </div>
  );
}
