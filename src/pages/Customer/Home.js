
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Reload from '../../components/Reload';
import Loading from '../../components/Loading';
import EmptyList from '../../components/EmptyList';
import StoreItem from '../../components/list_item/StoreItem';
import ProductItem from '../../components/list_item/ProductItem';
import CategoryItem from '../../components/list_item/CategoryItem';
import CarouselX from '../../components/CarouselX';
import SingleList from '../../components/list/SingleList';
import { categoryIcon, productIcon, storeIcon } from '../../assets/icons';
import { useListFooter, useRenderListFooter } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import { useHeader } from '../../hooks/headerHook';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useHomeRecommendedStoreList } from '../../hooks/home/homeRecommendedStoreListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHomeRecommendedProductList } from '../../hooks/home/homeRecommendedProductListHook';

const CAROUSEL_IMGS = [
  {
    title: 'Buy food',
    photo: '/home/burger.jpg'
  },{
    title: 'Instant delivery',
    photo: '/home/delivery.jpg'
  }, 
  {
    title: 'Buy medicine',
    photo: '/home/drugs.jpg'
  },
  {
    title: 'Buy drinks',
    photo: '/home/drink.jpg'
  }
];

function Categories({ categories, categoriesFetchStatus, refetch }) {

  const { t } = useTranslation();

  return (
    <div className="bg-color-gray lg:my-2">
      <div className="container-x border pt-2 pb-4 border-transparent">
        <h3 className="font-bold my-2">{ t('_category.Categories') }</h3>
        <SingleList
          data={categories}
          className="grid gap-4 grid-cols-3 md:grid-cols-4"
          renderDataItem={(item, i)=> (
            <CategoryItem 
              key={`category-${item.id}`} 
              index={i}
              category={item} 
              grid={true}
              />
          )}
          footer={useRenderListFooter(
            categoriesFetchStatus,
            ()=> <li key="categories-footer" className="col-span-3 md:col-span-4"> <Loading /> </li>, 
            ()=> <li key="categories-footer" className="col-span-3 md:col-span-4"> <Reload action={refetch} /> </li>,
            ()=> <li key="categories-footer" className="col-span-3 md:col-span-4"> <EmptyList text="_empty.No_category" icon={categoryIcon} /> </li>
          )}
          />
      </div>
    </div>
  );
}

function Stores() {

  const { t } = useTranslation();

  const listFooter = useListFooter();

  const [
    fetch, 
    stores, 
    storesLoading, 
    storesError, 
    storesLoaded, 
    retryFetch
  ] = useHomeRecommendedStoreList();

  useEffect(
    function() { 
      fetch() 
    },
    [fetch]
  );
  
  return (
    <div className="container-x py-2">
      <h3 className="font-bold my-2">{ t('_store.Recommended_stores') }</h3>
      <SingleList
          data={stores}
          className="list-x"
          renderDataItem={(item)=> (
            <li key={`store-${item.id}`}> <StoreItem store={item} /> </li>
          )}
          footer={listFooter([
            {
              canRender: storesLoading,
              render() { 
                return ( 
                  <li key="stores-footer" className="list-x-col-span"> 
                    <Loading /> 
                  </li> 
                ); 
              },
            }, 
            {
              canRender: storesError !== null,
              render() { 
                return (
                  <li key="stores-footer" className="list-x-col-span"> 
                    <Reload action={retryFetch} /> 
                  </li> 
                );
              },
            },
            {
              canRender: storesLoaded && stores.length === 0,
              render() { 
                return (
                  <li key="stores-footer" className="list-x-col-span"> 
                    <EmptyList text="_empty.No_store" icon={storeIcon} /> 
                  </li> 
                );
              }
            }
          ])}
          />
    </div>
  );
}

function Products() {
  
  const { t } = useTranslation();

  const listFooter = useListFooter();

  const [
    fetch, 
    products, 
    productsLoading, 
    productsError, 
    productsLoaded, 
    retryFetch
  ] = useHomeRecommendedProductList();

  useEffect(
    function() { 
      fetch() 
    },
    [fetch]
  );
  
  return (
    <div className="container-x py-2">
      <h3 className="font-bold my-2">{ t('_product.Recommended_products') }</h3>
      <SingleList
        data={products}
        className="list-x"
        renderDataItem={(item)=> (
          <li key={`product-${item.id}`}> <ProductItem product={item} /> </li>
        )}
        footer={listFooter([
          {
            canRender: productsLoading,
            render() { 
              return ( 
                <li key="product-footer" className="list-x-col-span"> 
                  <Loading /> 
                </li> 
              ); 
            },
          }, 
          {
            canRender: productsError !== null,
            render() { 
              return (
                <li key="product-footer" className="list-x-col-span"> 
                  <Reload action={retryFetch} /> 
                </li> 
              );
            },
          },
          {
            canRender: productsLoaded && products.length === 0,
            render() { 
              return (
                <li key="product-footer" className="list-x-col-span"> 
                  <EmptyList text="_empty.No_product" icon={productIcon} /> 
                </li> 
              );
            }
          }
        ])}
        />
    </div>
  );
}

export default function Home() {

  useHeader({ topNavPaths: ['/cart', '/search'] });

  const { 
    home: {
      home: {
        storesLoaded,
      } 
    }
  } = useAppContext();

  const [
    categories, 
    categoriesFetchStatus, 
    refetchCategories
  ] = useStoreCategoryList();


  return (
    <section>

      <div className="container-x">
        <CarouselX items={CAROUSEL_IMGS} />
      </div>

      <Categories 
        categories={categories}
        categoriesFetchStatus={categoriesFetchStatus}
        refetch={refetchCategories}
        />

      {
        categoriesFetchStatus === FETCH_STATUSES.DONE &&
        <Stores />
      }

      {
        storesLoaded &&
        <Products />
      }

    </section>
  );
}


