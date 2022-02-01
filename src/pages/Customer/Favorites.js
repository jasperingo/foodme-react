
import React from 'react';
import { favoritedIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Forbidden from '../../components/Forbidden';
import ScrollList from '../../components/list/ScrollList';
import ProductItem from '../../components/list_item/ProductItem';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useFavoriteList } from '../../hooks/favorite/favoriteListHook';
import { useHeader } from '../../hooks/headerHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';


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
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch,
    refresh
  ] = useFavoriteList(customer.id, customerToken);

  return (
    <section>
      <div className="container-x">
        
        <ScrollList
          data={products}
          nextPage={refetch}
          refreshPage={refresh}
          hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
          className="list-x"
          renderDataItem={(item)=> (
            <li key={`favorite-${item.id}`}> <ProductItem product={item.product} /> </li>
          )}
          footer={useRenderListFooter(
            productsFetchStatus,
            ()=> <li key="favorite-footer"> <Loading /> </li>, 
            ()=> <li key="favorite-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="favorite-footer"> <EmptyList text="_empty.No_favorite" icon={favoritedIcon} /> </li>,
            ()=> <li key="favorite-footer"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="favorite-footer"> <NotFound /> </li>,
            ()=> <li key="favorite-footer"> <Forbidden /> </li>,
          )}
          />

      </div>
    </section>
  );
}
