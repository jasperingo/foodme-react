
import React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryIcon } from '../assets/icons';
import EmptyList from '../components/EmptyList';
import SingleList from '../components/list/SingleList';
import CategoryItem from '../components/list_item/CategoryItem';
import Loading from '../components/Loading';
import Reload from '../components/Reload';
import { useProductCategoryList } from '../hooks/category/productCategoryListHook';
import { useStoreCategoryList } from '../hooks/category/storeCategoryListHook';
import { useRenderListFooter } from '../hooks/viewHook';
import { FETCH_STATUSES } from '../repositories/Fetch';


function List({ headerText, categories, categoriesFetchStatus, refetch }) {

  const { t } = useTranslation();

  return (
    <div className="py-2">
      <h3 className="font-bold my-2">{ t(headerText) }</h3>
      <SingleList
        data={categories}
        className="category-list"
        renderDataItem={(item, i)=> (
          <CategoryItem 
            key={`category-${item.id}`} 
            index={i}
            category={item} 
            grid={false}
            />
        )}
        footer={useRenderListFooter(
          categoriesFetchStatus,
          ()=> <li key="category-footer" className="col-span-3"> <Loading /> </li>, 
          ()=> <li key="category-footer" className="col-span-3"> <Reload action={refetch} /> </li>,
          ()=> <li key="category-footer" className="col-span-3"> <EmptyList text="_empty.No_category" icon={categoryIcon} /> </li>
        )}
        />
    </div>
  );
}


export default function Categories() {

  const [
    stores, 
    storesFetchStatus, 
    refetchStores
  ] = useStoreCategoryList();

  const [
    products, 
    productsFetchStatus, 
    refetchProducts
  ] = useProductCategoryList(storesFetchStatus === FETCH_STATUSES.DONE);

  return (
    <section>
      
      <div className="container-x">
        
        <List 
          headerText="_store.Store_categories"
          categories={stores}
          categoriesFetchStatus={storesFetchStatus}
          refetch={refetchStores}
          />

        {
          storesFetchStatus === FETCH_STATUSES.DONE && 
          <List 
            headerText="_product.Product_categories"
            categories={products}
            categoriesFetchStatus={productsFetchStatus}
            refetch={refetchProducts}
            />
        }

      </div>

    </section>
  );
}
