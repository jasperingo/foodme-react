
import React from 'react';
import { productIcon } from '../../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import FetchMoreButton from '../../FetchMoreButton';
import Forbidden from '../../Forbidden';
import ScrollList from '../../list/ScrollList';
import ProductItem from '../../list_item/ProductItem';
import Loading from '../../Loading';
import NotFound from '../../NotFound';
import Reload from '../../Reload';

export default function ProductList({ products, productsFetchStatus, productsPage, productsNumberOfPages, refetch }) {
  
  return (
    <div>
      <div className="container-x">

        <ScrollList
          data={products}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
          className="list-x"
          renderDataItem={(item)=> (
            <li key={`product-${item.id}`}> <ProductItem product={item} /> </li>
          )}
          footer={useRenderListFooter(
            productsFetchStatus,
            ()=> <li key="product-footer"> <Loading /> </li>, 
            ()=> <li key="product-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="product-footer"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>,
            ()=> <li key="product-footer"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="product-footer"> <NotFound /> </li>,
            ()=> <li key="product-footer"> <Forbidden /> </li>,
          )}
          />

      </div>
    </div>
  );
}

