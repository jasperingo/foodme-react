
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryFirmProfile from '../../components/profile/DeliveryFirmProfile';
import Reload from '../../components/Reload';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmReviewList } from '../../hooks/delivery_firm/deliveryFirmReviewListHook';
import { useDeliveryFirmRouteList } from '../../hooks/delivery_firm/deliveryFirmRouteListHook';
import { useDeliveryFirmFetch } from '../../hooks/delivery_firm/deliveryFirmFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useReviewCreate } from '../../hooks/review/reviewCreateHook';
import { useReviewDelete } from '../../hooks/review/reviewDeleteHook';
import { useReviewUpdate } from '../../hooks/review/reviewUpdateHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useParams } from 'react-router-dom';
import RouteList from '../../components/list/RouteList';
import ReviewList from '../../components/list/ReviewList';

const NAV_LINKS = [
  { title : '_delivery.Routes', href: '' },
  { title : '_extra.Reviews', href: '/reviews' }
];

function DeliveryFirmReviewsList() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    deliveryFirm: {
      deliveryFirm: {
        deliveryFirm
      }
    }
  } = useAppContext();
  
  const [
    fetchDeliveryFirmReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages
  ] = useDeliveryFirmReviewList(customerToken);

  const onReviewUpdate = useReviewUpdate();

  const onReviewDelete = useReviewDelete({ deliveryFirm: true });

  const onReviewCreate = useReviewCreate({ deliveryFirm: deliveryFirm.id });

  useEffect(
    function() {
      if (!reviewsLoaded && reviewsError === null) 
        fetchDeliveryFirmReviews(deliveryFirm.id); 
    },
    [deliveryFirm.id, reviewsError, reviewsLoaded, fetchDeliveryFirmReviews]
  );

  return (
    <>
      <div className="container-x">

        <ReviewRaterAndSummary
          onReviewCreate={onReviewCreate} 
          onReviewUpdate={onReviewUpdate}
          onReviewDelete={onReviewDelete}
          summary={deliveryFirm.review_summary}
          title="_review.Rate_this_store"
          review={customerToken === null || !deliveryFirm?.reviews?.length ? null : deliveryFirm.reviews[0]}
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
        fetchReviews={()=> fetchDeliveryFirmReviews(deliveryFirm.id)}
        />
    </>
  );
}

function DeliveryFirmRoutesList() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    deliveryFirm: {
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryFirmRoutes,
    routes, 
    routesLoading,
    routesError,
    routesLoaded,
    routesPage, 
    routesNumberOfPages,
  ] = useDeliveryFirmRouteList(customerToken);
  
  useEffect(
    function() {
      if (!routesLoaded && routesError === null) 
        fetchDeliveryFirmRoutes(deliveryFirm.id); 
    },
    [deliveryFirm.id, routesError, routesLoaded, fetchDeliveryFirmRoutes]
  );

  return (
    <RouteList 
      routes={routes}
      routesPage={routesPage}
      routesError={routesError}
      routesLoaded={routesLoaded}
      routesLoading={routesLoading}
      routesNumberOfPages={routesNumberOfPages}
      fetchRoutes={()=> fetchDeliveryFirmRoutes(deliveryFirm.id)}
      />
  );
}

export default function DeliveryFirm() {

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
    fetchDeliveryFirm,
    deliveryFirm,
    deliveryFirmLoading,
    deliveryFirmError,
    deliveryFirmID,
    unfetchDeliveryFirm
  ] = useDeliveryFirmFetch(customerToken);

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Delivery_firm',
    topNavPaths: ['/cart', '/search']
  });

  useEffect(
    function() {
      if ((deliveryFirm !== null || deliveryFirmError !== null) && deliveryFirmID !== ID) 
        unfetchDeliveryFirm();
      else if (deliveryFirm === null && deliveryFirmError === null)
        fetchDeliveryFirm(ID);
    },
    [ID, deliveryFirm, deliveryFirmError, deliveryFirmID, fetchDeliveryFirm, unfetchDeliveryFirm]
  );

  return (
    <section>

      <div className="container-x">
        
        { deliveryFirm !== null && <DeliveryFirmProfile deliveryFirm={deliveryFirm} navLinks={NAV_LINKS} /> }
        { deliveryFirmLoading && <Loading /> }
        { deliveryFirmError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { deliveryFirmError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { deliveryFirmError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDeliveryFirm(ID)} /> }
        { deliveryFirmError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryFirm(ID)} /> }
        
      </div>

      {
        deliveryFirm !== null && 
        <Switch>
          <Route path={`${match.url}/reviews`} render={()=> <DeliveryFirmReviewsList />} />
          <Route path={match.url} render={()=> <DeliveryFirmRoutesList />} />
        </Switch>
      }

    </section>
  );
}
