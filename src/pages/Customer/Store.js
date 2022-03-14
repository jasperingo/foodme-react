
import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import { categoryIcon } from '../../assets/icons';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useListFooter, useRenderOnDataFetched, useURLQuery } from '../../hooks/viewHook';
import ProductList from '../../components/profile/section/ProductList';
import { useStoreProductList } from '../../hooks/store/storeProductListHook';
import { useAppContext } from '../../hooks/contextHook';
import StoreProfile from '../../components/profile/StoreProfile';
import { useStoreReviewList } from '../../hooks/store/storeReviewListHook';
import ReviewList from '../../components/profile/section/ReviewList';
import { useStoreDiscountList } from '../../hooks/store/storeDiscountListHook';
import DiscountList from '../../components/profile/section/DiscountList';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useHeader } from '../../hooks/headerHook';
import { useReviewUpdate } from '../../hooks/review/reviewUpdateHook';
import { useReviewDelete } from '../../hooks/review/reviewDeleteHook';
import { useReviewCreate } from '../../hooks/review/reviewCreateHook';
import SelectFilter from '../../components/filter/SelectFilter';
import { useStoreProductCategoryList } from '../../hooks/store/storeProductCategoryListHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

const NAV_LINKS = [
  { title : '_extra.Menu', href: '' },
  { title : '_product.Products', href: '/products' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_discount.Discounts', href: '/discounts' }
];

function StoreDiscountsList() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [
    discounts, 
    discountsFetchStatus, 
    discountsPage, 
    discountsNumberOfPages, 
    refetch
  ] = useStoreDiscountList(customerToken);
  
  return (
    <DiscountList
      discounts={discounts}
      discountsFetchStatus={discountsFetchStatus}
      discountsPage={discountsPage}
      discountsNumberOfPages={discountsNumberOfPages}
      refetch={refetch}
      />
  );
}

function StoreReviewsList() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    store: { 
      store: {
        store
      } 
    }
  } = useAppContext();
  
  const [
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useStoreReviewList(customerToken);

  const onReviewUpdate = useReviewUpdate();

  const onReviewDelete = useReviewDelete({ store: true });

  const onReviewCreate = useReviewCreate({ store: store.id });

  return (
    <>
      <div className="container-x">

        <ReviewRaterAndSummary
          onReviewCreate={onReviewCreate} 
          onReviewUpdate={onReviewUpdate}
          onReviewDelete={onReviewDelete}
          summary={store.review_summary}
          title="_review.Rate_this_store"
          review={customerToken === null || !store?.reviews?.length ? null : store.reviews[0]}
          />

      </div>

      <ReviewList 
        reviews={reviews}
        reviewsFetchStatus={reviewsFetchStatus}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        refetch={refetch}
        />
    </>
  );
}

function StoreProductsListList() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    store: {
      store: {
        productsSubCategory
      } 
    }
  } = useAppContext();

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch,
    onStatusChange
  ] = useStoreProductList(customerToken);

  const param = useURLQuery();

  useEffect(
    function() {
      if (param.get('sub_category') !== productsSubCategory)
        onStatusChange(param.get('sub_category'));
    },
    [param, productsSubCategory, onStatusChange]
  );
  
  return (
    <ProductList 
      products={products}
      productsFetchStatus={productsFetchStatus}
      productsPage={productsPage}
      productsNumberOfPages={productsNumberOfPages}
      refetch={refetch}
      />
  );
}

function StoreProductsList() {

  const [
    fetch, 
    categories, 
    categoriesLoading, 
    categoriesError, 
    , 
    retryFetchCategories
  ] = useStoreProductCategoryList();

  const param = useURLQuery();

  const history = useHistory();

  const match = useRouteMatch();

  useEffect(fetch, [fetch]);
  
  function onFilterChange(value) {
    if (value)
      param.set('sub_category', value);
    else 
      param.delete('sub_category');
    
    history.replace(`${match.url}?${param.toString()}`);
  }
  
  if (categoriesLoading) {
    return <Loading />;
  }

  if (categoriesError === NetworkErrorCodes.UNKNOWN_ERROR) {
    return <Reload action={retryFetchCategories} />;
  }

  if (categoriesError === NetworkErrorCodes.NOT_FOUND) {
    return <NotFound />;
  }

  if (categoriesError === NetworkErrorCodes.FORBIDDEN) {
    return <Forbidden />;
  }

  return (
    <>
      <div className="container-x">
        <SelectFilter 
          onFilterChange={onFilterChange} 
          value={param.get('sub_category')} 
          options={categories.flatMap(i=> i.sub_categories).map(i=> ({ text: i.name, value: i.id }))} 
          /> 
      </div>
      <StoreProductsListList />
    </>
  );
}

function StoreProductCategoriesList({ url }) {

  const listFooter = useListFooter();

  const history = useHistory();

  const param = useURLQuery();

  const [
    fetch, 
    productCategories, 
    productCategoriesLoading, 
    productCategoriesError, 
    productCategoriesLoaded, 
    retryFetch
  ] = useStoreProductCategoryList();

  useEffect(fetch, [fetch]);

  function onFilterChange(value) {
    param.set('sub_category', value);
    history.push(`${url}/products?${param.toString()}`);
  }

  return (
    <div>
      <div className="container-x">
        <SingleList
          data={productCategories.flatMap(i=> i.sub_categories)}
          className="grid grid-cols-3 gap-4 p-1"
          renderDataItem={(item)=> (
            <li key={`category-${item.id}`}>
              <button className="block shadow" onClick={()=> onFilterChange(item.id)}>
                <img 
                  src={item.photo.href} 
                  alt={item.name} 
                  width="100" 
                  height="100" 
                  className="w-full mb-1 h-20 block mx-auto rounded lg:h-52 lg:w-full lg:mb-1"
                  />
                <div className="p-1 truncate overflow-ellipsis">{ item.name }</div>
              </button>
            </li>
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
                    <Reload action={retryFetch} /> 
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
    </div>
  );
}

export default function Store() {

  const match = useRouteMatch();

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [
    store, 
    storeFetchStatus, 
    refetch
  ] = useStoreFetch(customerToken);


  useHeader({ 
    title: `${store?.user.name ?? 'Loading...'} - Store`,
    headerTitle: '_store.Store',
    topNavPaths: ['/cart', '/search']
  });

  return (
    <section>

      <div className="container-x">
        {
          useRenderOnDataFetched(
            storeFetchStatus,
            ()=> <StoreProfile store={store} navLinks={NAV_LINKS} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>

      {
        store && 
        <Switch>
          <Route path={`${match.url}/discounts`} render={()=> <StoreDiscountsList />} />
          <Route path={`${match.url}/reviews`} render={()=> <StoreReviewsList ratings={store.rating} />} />
          <Route path={`${match.url}/products`} render={()=> <StoreProductsList />} />
          <Route path={match.url} render={()=> <StoreProductCategoriesList url={match.url} />} />
        </Switch>
      }

    </section>
  );
}

