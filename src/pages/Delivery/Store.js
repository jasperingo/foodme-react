
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useAppContext } from '../../hooks/contextHook';
import StoreProfile from '../../components/profile/StoreProfile';
import { useStoreReviewList } from '../../hooks/store/storeReviewListHook';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useHeader } from '../../hooks/headerHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useParams } from 'react-router-dom';
import ReviewList from '../../components/list/ReviewList';
import WorkingHoursList from '../../components/list/WorkingHoursList';

const NAV_LINKS = [
  { title : '_extra.Reviews', href: '' },
  { title : '_user.Working_hours', href: '/working-hours' },
];

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

function StoreReviewsList() {

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
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
  ] = useStoreReviewList(deliveryFirmToken);

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
          <Route path={`${match.url}/working-hours`} render={()=> <StoreWokingHoursList />} />
          <Route path={match.url} render={()=> <StoreReviewsList />} />
        </Switch>
      }

    </section>
  );
}
