
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useRenderOnDataFetched } from '../../hooks/viewHook';
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

const NAV_LINKS = [
  { title : '_product.Products', href: '' },
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

  function onNewReview(rating, description) {
    console.log(rating, description);
  }

  return (
    <>
      <div className="container-x">

        <ReviewRaterAndSummary 
          onReviewSubmit={onNewReview}
          summary={store.review_summary}
          title="_review.Rate_this_store"
          review={customerToken === null || store.reviews?.length === 0 ? null : store.reviews[0]}
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

function StoreProductsList() {

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
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch
  ] = useStoreProductList(customerToken);
  
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
          <Route path={match.url} render={()=> <StoreProductsList />} />
        </Switch>
      }

    </section>
  );
}

