
import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useURLQuery } from '../../hooks/viewHook';
import { useStoreProductList } from '../../hooks/store/storeProductListHook';
import { useAppContext } from '../../hooks/contextHook';
import StoreProfile from '../../components/profile/StoreProfile';
import { useStoreReviewList } from '../../hooks/store/storeReviewListHook';
import { useStoreDiscountList } from '../../hooks/store/storeDiscountListHook';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useHeader } from '../../hooks/headerHook';
import { useReviewUpdate } from '../../hooks/review/reviewUpdateHook';
import { useReviewDelete } from '../../hooks/review/reviewDeleteHook';
import { useReviewCreate } from '../../hooks/review/reviewCreateHook';
import SelectFilter from '../../components/filter/SelectFilter';
import { useStoreProductCategoryList } from '../../hooks/store/storeProductCategoryListHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useParams } from 'react-router-dom';
import ProductList from '../../components/list/ProductList';
import ReviewList from '../../components/list/ReviewList';
import DiscountList from '../../components/list/DiscountList';
import StoreProductCategoryList from '../../components/list/StoreProductCategoryList';
import WorkingHoursList from '../../components/list/WorkingHoursList';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { messageIcon } from '../../assets/icons';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { title : '_extra.Menu', href: '' },
  { title : '_product.Products', href: '/products' },
  { title : '_user.Working_hours', href: '/working-hours' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_discount.Discounts', href: '/discounts' }
];

function ContactPharmacy({ store }) {
  const { t } = useTranslation();

  return (
    <div className="container-x text-center">
      <Link to={`/messages/${store.user.id}`} className="inline-block text-center">
        <Icon path={messageIcon} className="block mx-auto h-40 w-40 text-color-primary" />
        <span className="font-bold">{t('_store._contact_pharmacy_to_order')}</span>
      </Link>
    </div>
  )
}

function StoreDiscountsList() {

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
    fetchStoreDiscounts,
    discounts, 
    discountsLoading,
    discountsLoaded,
    discountsError,
    discountsPage, 
    discountsNumberOfPages,
  ] = useStoreDiscountList(customerToken);
  
  useEffect(
    function() {
      if (!discountsLoaded && discountsError === null) 
        fetchStoreDiscounts(store.id); 
    },
    [store.id, discountsError, discountsLoaded, fetchStoreDiscounts]
  );

  return (
    <DiscountList
      discounts={discounts}
      discountsPage={discountsPage}
      discountsError={discountsError}
      discountsLoaded={discountsLoaded}
      discountsLoading={discountsLoading}
      discountsNumberOfPages={discountsNumberOfPages}
      fetchDiscounts={()=> fetchStoreDiscounts(store.id)}
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
    fetchStoreReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages
  ] = useStoreReviewList(customerToken);

  const [
    reviewUpdateOnSubmit,
    reviewUpdateLoading,
    reviewUpdateFormSuccess,
    reviewUpdateFormError,
    reviewUpdateResetSubmit
  ] = useReviewUpdate();

  const [
    reviewDeleteOnSubmit,
    reviewDeleteLoading,
    reviewDeleteFormSuccess,
    reviewDeleteFormError,
    reviewDeleteResetSubmit
  ] = useReviewDelete({ store: true });
  
  const [
    reviewCreateOnSubmit,
    reviewCreateLoading,
    reviewCreateFormSuccess,
    reviewCreateFormError,
    reviewCreateResetSubmit
  ] = useReviewCreate({ store: store.id });

  useEffect(
    function() {
      if (!reviewsLoaded && reviewsError === null) 
        fetchStoreReviews(store.id); 
    },
    [store.id, reviewsError, reviewsLoaded, fetchStoreReviews]
  );

  return (
    <>
      <div className="container-x">

        <ReviewRaterAndSummary
          summary={store.review_summary}
          title="_review.Rate_this_store"
          review={customerToken === null || !store?.reviews?.length ? null : store.reviews[0]}

          reviewDeleteOnSubmit={reviewDeleteOnSubmit}
          reviewDeleteLoading={reviewDeleteLoading}
          reviewDeleteFormSuccess={reviewDeleteFormSuccess}
          reviewDeleteFormError={reviewDeleteFormError}
          reviewDeleteResetSubmit={reviewDeleteResetSubmit}

          reviewCreateOnSubmit={reviewCreateOnSubmit}
          reviewCreateLoading={reviewCreateLoading}
          reviewCreateFormSuccess={reviewCreateFormSuccess}
          reviewCreateFormError={reviewCreateFormError}
          reviewCreateResetSubmit={reviewCreateResetSubmit}

          reviewUpdateOnSubmit={reviewUpdateOnSubmit}
          reviewUpdateLoading={reviewUpdateLoading}
          reviewUpdateFormSuccess={reviewUpdateFormSuccess}
          reviewUpdateFormError={reviewUpdateFormError}
          reviewUpdateResetSubmit={reviewUpdateResetSubmit}
          />

      </div>

      <ReviewList 
        single={false}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        fetchReviews={()=> fetchStoreReviews(store.id)}
        />
    </>
  );
}

function StoreWokingHoursList() {
  const {
    store: { 
      store: {
        store
      } 
    }
  } = useAppContext();

  return <WorkingHoursList workingHours={store.user.working_hours} />;
}

function StoreProductsList() {

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

  const param = new URLSearchParams();

  const history = useHistory();

  const match = useRouteMatch();

  const [subCategory] = useURLQuery(['sub_category']);

  const [
    fetchProductCategories, 
    productCategories, 
    productCategoriesLoading, 
    productCategoriesError, 
    productCategoriesLoaded,
  ] = useStoreProductCategoryList(customerToken);

  const [
    fetchStoreProducts,
    products, 
    productsLoading,
    productsError,
    productsLoaded,
    productsPage, 
    productsNumberOfPages,
    refreshStoreProducts
  ] = useStoreProductList(customerToken);

  useEffect(
    function() {
      if (store.sub_category.category.id !== 2 && !productCategoriesLoaded && productCategoriesError === null) 
        fetchProductCategories(store.id);
    },
    [store, productCategoriesLoaded, productCategoriesError, fetchProductCategories]
  );

  useEffect(
    function() {
      if (store.sub_category.category.id !== 2 && productCategoriesLoaded && !productsLoaded && productsError === null) 
        fetchStoreProducts(store.id, subCategory); 
    },
    [store, productCategoriesLoaded, productsError, productsLoaded, subCategory, fetchStoreProducts]
  );
  
  function onFilterChange(value) {
    if (value)
      param.set('sub_category', value);
    else 
      param.delete('sub_category');
    
    history.replace(`${match.url}?${param.toString()}`);

    refreshStoreProducts();
  }

  if (store.sub_category.category.id === 2) {
    return <ContactPharmacy store={store} />;
  }

  return (
    <>
      <div className="container-x">

        { productCategoriesLoading && <Loading /> }

        { productCategoriesError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { productCategoriesError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { productCategoriesError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchProductCategories(store.id)} /> }

        { productCategoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchProductCategories(store.id)} /> }

        {
          productCategoriesLoaded && 
          <SelectFilter 
            onFilterChange={onFilterChange} 
            value={subCategory} 
            options={productCategories.flatMap(i=> i.sub_categories).map(i=> ({ text: i.name, value: i.id }))} 
            /> 
        }
      </div>
      
      <ProductList 
        products={products}
        productsPage={productsPage}
        productsError={productsError}
        productsLoaded={productsLoaded}
        productsLoading={productsLoading}
        productsNumberOfPages={productsNumberOfPages}
        fetchProducts={()=> fetchStoreProducts(store.id, subCategory)}
        />
    </>
  );
}

function StoreProductCategoriesList() {

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

  const match = useRouteMatch();

  const history = useHistory();
  
  const param = new URLSearchParams();

  const [
    fetchProductCategories, 
    productCategories, 
    productCategoriesLoading, 
    productCategoriesError, 
    productCategoriesLoaded,
  ] = useStoreProductCategoryList(customerToken);

  useEffect(
    function() {
      if (store.sub_category.category.id !== 2 && !productCategoriesLoaded && productCategoriesError === null) 
        fetchProductCategories(store.id);
    },
    [store, productCategoriesLoaded, productCategoriesError, fetchProductCategories]
  );

  function onFilterChange(value) {
    param.set('sub_category', value);
    history.push(`${match.url}/products?${param.toString()}`);
  }

  if (store.sub_category.category.id === 2) {
    return <ContactPharmacy store={store} />;
  }

  return (
    <StoreProductCategoryList
      onFilterChange={onFilterChange}
      productCategories={productCategories}
      productCategoriesLoading={productCategoriesLoading}
      productCategoriesError={productCategoriesError}
      productCategoriesLoaded={productCategoriesLoaded}
      fetchProductCategories={()=> fetchProductCategories(store.id)}
      />
  );
}

export default function Store() {

  const { ID } = useParams();

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
    fetchStore,
    store,
    storeLoading,
    storeError,
    storeID,
    unfetchStore
  ] = useStoreFetch(customerToken);

  useHeader({ 
    title: `${store?.user.name ?? 'Loading...'} - Store`,
    headerTitle: '_store.Store',
    topNavPaths: ['/cart', '/search']
  });
  
  useEffect(
    function() {
      if ((store !== null || storeError !== null) && storeID !== ID) 
        unfetchStore();
      else if (store === null && storeError === null)
        fetchStore(ID);
    },
    [ID, store, storeError, storeID, fetchStore, unfetchStore]
  );
  
  return (
    <section>

      <div className="container-x">
        
        { store !== null && <StoreProfile store={store} navLinks={NAV_LINKS} /> }
        { storeLoading && <Loading /> }
        { storeError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { storeError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { storeError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchStore(ID)} /> }
        { storeError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchStore(ID)} /> }
        
      </div>

      {
        store !== null && 
        <Switch>
          <Route path={`${match.url}/discounts`} render={()=> <StoreDiscountsList />} />
          <Route path={`${match.url}/reviews`} render={()=> <StoreReviewsList />} />
          <Route path={`${match.url}/working-hours`} render={()=> <StoreWokingHoursList />} />
          <Route path={`${match.url}/products`} render={()=> <StoreProductsList />} />
          <Route path={match.url} render={()=> <StoreProductCategoriesList />} />
        </Switch>
      }

    </section>
  );
}
