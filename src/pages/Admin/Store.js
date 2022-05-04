
import React, { useEffect } from 'react';
import { useRouteMatch, useParams, Route, Switch, useHistory } from 'react-router-dom';
import SelectFilter from '../../components/filter/SelectFilter';
import Forbidden from '../../components/Forbidden';
import DiscountList from '../../components/list/DiscountList';
import OrderList from '../../components/list/OrderList';
import ProductList from '../../components/list/ProductList';
import ReviewList from '../../components/list/ReviewList';
import StoreProductCategoryList from '../../components/list/StoreProductCategoryList';
import TransactionList from '../../components/list/TransactionList';
import WorkingHoursList from '../../components/list/WorkingHoursList';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import StoreProfile from '../../components/profile/StoreProfile';
import Reload from '../../components/Reload';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreDiscountList } from '../../hooks/store/storeDiscountListHook';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import { useStoreOrderList } from '../../hooks/store/storeOrderListHook';
import { useStoreProductCategoryList } from '../../hooks/store/storeProductCategoryListHook';
import { useStoreProductList } from '../../hooks/store/storeProductListHook';
import { useStoreReviewList } from '../../hooks/store/storeReviewListHook';
import { useStoreTransactionList } from '../../hooks/store/storeTransactionListHook';
import { useURLQuery } from '../../hooks/viewHook';

const NAV_LINKS = [
  { title : '_extra.Menu', href: '' },
  { title : '_product.Products', href: '/products' },
  { title : '_user.Working_hours', href: '/working-hours' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_discount.Discounts', href: '/discounts' },
  { title : '_order.Orders', href: '/orders' },
  { title : '_transaction.Transactions', href: '/transactions' }
];

function StoreTransactionsList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }, 
    store: { 
      store: {
        store,
      }
    } 
  } = useAppContext();
  
  const [
    fetchStoreTransactions, 
    transactions, 
    transactionsLoading, 
    transactionsLoaded, 
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages
  ] = useStoreTransactionList(adminToken);

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchStoreTransactions(store.id); 
    },
    [store.id, transactionsLoaded, transactionsError, fetchStoreTransactions]
  );

  return (
    <TransactionList
      transactions={transactions}
      transactionsPage={transactionsPage}
      transactionsError={transactionsError}
      transactionsLoading={transactionsLoading}
      transactionsLoaded={transactionsLoaded}
      transactionsNumberOfPages={transactionsNumberOfPages}
      fetchTransactions={()=> fetchStoreTransactions(store.id)}
      />
  );
}

function StoreOrdersList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    store: { 
      store: {
        store,
      }
    } 
  } = useAppContext();

  const [
    fetchStoreOrders,
    orders, 
    ordersLoaded,
    ordersLoading,
    ordersError,
    ordersPage, 
    ordersNumberOfPages
  ] = useStoreOrderList(adminToken);

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchStoreOrders(store.id); 
    },
    [store.id, ordersLoaded, ordersError, fetchStoreOrders]
  );

  return (
    <OrderList 
      orders={orders}
      ordersPage={ordersPage}
      ordersError={ordersError}
      ordersLoaded={ordersLoaded}
      ordersLoading={ordersLoading}
      ordersNumberOfPages={ordersNumberOfPages}
      fetchOrders={()=> fetchStoreOrders(store.id)}
      />
  );
}

function StoreDiscountsList() {

  const {
    admin: { 
      admin: {
        adminToken
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
  ] = useStoreDiscountList(adminToken);
  
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
    admin: { 
      admin: {
        adminToken
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
  ] = useStoreReviewList(adminToken);

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
    admin: { 
      admin: {
        adminToken
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
  ] = useStoreProductCategoryList(adminToken);

  const [
    fetchStoreProducts,
    products, 
    productsLoading,
    productsError,
    productsLoaded,
    productsPage, 
    productsNumberOfPages,
    refreshStoreProducts
  ] = useStoreProductList(adminToken);
  
  useEffect(
    function() {
      if (!productCategoriesLoaded && productCategoriesError === null) 
        fetchProductCategories(store.id);
    },
    [store.id, productCategoriesLoaded, productCategoriesError, fetchProductCategories]
  );

  useEffect(
    function() {
      if (productCategoriesLoaded && !productsLoaded && productsError === null) 
        fetchStoreProducts(store.id, subCategory); 
    },
    [store.id, productCategoriesLoaded, productsError, productsLoaded, subCategory, fetchStoreProducts]
  );
  
  function onFilterChange(value) {
    if (value)
      param.set('sub_category', value);
    else 
      param.delete('sub_category');
    
    history.replace(`${match.url}?${param.toString()}`);

    refreshStoreProducts();
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
    admin: { 
      admin: {
        adminToken
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
  ] = useStoreProductCategoryList(adminToken);

  useEffect(
    function() {
      if (!productCategoriesLoaded && productCategoriesError === null) 
        fetchProductCategories(store.id);
    },
    [store.id, productCategoriesLoaded, productCategoriesError, fetchProductCategories]
  );

  function onFilterChange(value) {
    param.set('sub_category', value);
    history.push(`${match.url}/products?${param.toString()}`);
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
    admin: { 
      admin: {
        adminToken
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
  ] = useStoreFetch(adminToken);

  useHeader({ 
    title: `${store?.user.name ?? 'Loading...'} - Store`,
    headerTitle: '_store.Store'
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
        
        { store !== null && <StoreProfile store={store} isAdmin={true} navLinks={NAV_LINKS} /> }
        { storeLoading && <Loading /> }
        { storeError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { storeError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { storeError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchStore(ID)} /> }
        { storeError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchStore(ID)} /> }
        
      </div>

      {
        store !== null && 
        <Switch>
          <Route path={`${match.url}/transactions`} render={()=> <StoreTransactionsList />} />
          <Route path={`${match.url}/orders`} render={()=> <StoreOrdersList />} />
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

