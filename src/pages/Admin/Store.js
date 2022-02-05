
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DiscountList from '../../components/profile/section/DiscountList';
import OrderList from '../../components/profile/section/OrderList';
import ProductList from '../../components/profile/section/ProductList';
import ReviewList from '../../components/profile/section/ReviewList';
import TransactionList from '../../components/profile/section/TransactionList';
import StoreProfile from '../../components/profile/StoreProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreDiscountList } from '../../hooks/store/storeDiscountListHook';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import { useStoreOrderList } from '../../hooks/store/storeOrderListHook';
import { useStoreProductList } from '../../hooks/store/storeProductListHook';
import { useStoreReviewList } from '../../hooks/store/storeReviewListHook';
import { useStoreTransactionList } from '../../hooks/store/storeTransactionListHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';


const NAV_LINKS = [
  { title : '_product.Products', href: '' },
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
  } = useAppContext();
  
  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch
  ] = useStoreTransactionList(adminToken);

  return (
    <TransactionList
      transactions={transactions}
      transactionsFetchStatus={transactionsFetchStatus}
      transactionsPage={transactionsPage}
      transactionsNumberOfPages={transactionsNumberOfPages}
      refetch={refetch}
      />
  );
}

function StoreOrdersList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
  ] = useStoreOrderList(adminToken);

  return (
    <OrderList 
      orders={orders}
      ordersFetchStatus={ordersFetchStatus}
      ordersPage={ordersPage}
      ordersNumberOfPages={ordersNumberOfPages}
      refetch={refetch}
      />
  );
}

function StoreDiscountsList() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    discounts, 
    discountsFetchStatus, 
    discountsPage, 
    discountsNumberOfPages, 
    refetch
  ] = useStoreDiscountList(adminToken);
  
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
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();
  
  const [
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useStoreReviewList(adminToken);

  return (
    <ReviewList 
      reviews={reviews}
      reviewsFetchStatus={reviewsFetchStatus}
      reviewsPage={reviewsPage}
      reviewsNumberOfPages={reviewsNumberOfPages}
      refetch={refetch}
      />
  );
}

function StoreProductsList() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch
  ] = useStoreProductList(adminToken);
  
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

export default function Store() {

  const match = useRouteMatch();

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    store, 
    storeFetchStatus, 
    refetch
  ] = useStoreFetch(adminToken);


  useHeader({ 
    title: `${store?.user.name ?? 'Loading...'} - Store`,
    headerTitle: '_store.Store'
  });

  return (
    <section>

      <div className="container-x">
        {
          useRenderOnDataFetched(
            storeFetchStatus,
            ()=> <StoreProfile store={store} navLinks={NAV_LINKS} isAdmin={true} />,
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
          <Route path={`${match.url}/transactions`} render={()=> <StoreTransactionsList />} />
          <Route path={`${match.url}/orders`} render={()=> <StoreOrdersList />} />
          <Route path={`${match.url}/discounts`} render={()=> <StoreDiscountsList />} />
          <Route path={`${match.url}/reviews`} render={()=> <StoreReviewsList />} />
          <Route path={match.url} render={()=> <StoreProductsList />} />
        </Switch>
      }

    </section>
  );
}

