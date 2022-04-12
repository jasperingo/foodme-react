
import React from 'react';
import { categoryIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import Forbidden from '../Forbidden';
import StoreProductCategoryItem from '../list_item/StoreProductCategoryItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import SingleList from './SingleList';

export default function StoreProductCategoryList(
  { productCategories, productCategoriesLoading, productCategoriesLoaded, productCategoriesError, fetchProductCategories, onFilterChange }
) {

  const listFooter = useListFooter();

  return (
    <div className="container-x">
      <SingleList
        data={productCategories.flatMap(i=> i.sub_categories)}
        className="grid grid-cols-3 gap-4 p-1"
        renderDataItem={(item)=> (
          <StoreProductCategoryItem key={`category-${item.id}`} item={item} onFilterChange={onFilterChange} />
        )}
        footer={listFooter([
          {
            canRender: productCategoriesLoading,
            render() { 
              return ( 
                <li key="category-footer" className="col-span-3"> <Loading /> </li>
              ); 
            },
          }, 
          {
            canRender: productCategoriesError === NetworkErrorCodes.UNKNOWN_ERROR,
            render() { 
              return (
                <li key="category-footer" className="col-span-3">
                  <Reload action={fetchProductCategories} /> 
                </li> 
              );
            },
          },
          {
            canRender: productCategoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() { 
              return (
                <li key="category-footer" className="col-span-3">
                  <Reload message="_errors.No_netowrk_connection" action={fetchProductCategories} /> 
                </li> 
              );
            },
          },
          {
            canRender: productCategoriesError === NetworkErrorCodes.NOT_FOUND,
            render() { 
              return (
                <li key="category-footer" className="col-span-3">
                  <NotFound />
                </li> 
              );
            },
          },
          {
            canRender: productCategoriesError === NetworkErrorCodes.FORBIDDEN,
            render() { 
              return (
                <li key="category-footer" className="col-span-3">
                  <Forbidden />
                </li> 
              );
            },
          },
          {
            canRender: productCategoriesLoaded && productCategories.length === 0,
            render() { 
              return (
                <li key="category-footer" className="col-span-3">
                  <EmptyList text="_empty.No_category" icon={categoryIcon} /> 
                </li> 
              );
            }
          }
        ])}
        />
    </div>
  );
}
