
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryFirmProfile from '../../components/profile/DeliveryFirmProfile';
import ReviewList from '../../components/profile/section/ReviewList';
import RouteList from '../../components/profile/section/RouteList';
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
import { useRenderOnDataFetched } from '../../hooks/viewHook';

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
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useDeliveryFirmReviewList(customerToken);

  const onReviewUpdate = useReviewUpdate();

  const onReviewDelete = useReviewDelete({ deliveryFirm: true });

  const onReviewCreate = useReviewCreate({ deliveryFirm: deliveryFirm.id });

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
        reviews={reviews}
        reviewsFetchStatus={reviewsFetchStatus}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        refetch={refetch}
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
    } 
  } = useAppContext();

  const [
    routes, 
    routesFetchStatus, 
    routesPage, 
    routesNumberOfPages, 
    refetch
  ] = useDeliveryFirmRouteList(customerToken);
  
  return (
    <RouteList 
      routes={routes}
      routesFetchStatus={routesFetchStatus}
      routesPage={routesPage}
      routesNumberOfPages={routesNumberOfPages}
      refetch={refetch}
      />
  );
}

export default function DeliveryFirm() {

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
    deliveryFirm, 
    deliveryFirmFetchStatus,
    refetch
  ] = useDeliveryFirmFetch(customerToken);

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Delivery_firm',
    topNavPaths: ['/cart', '/search']
  });

  return (
    <section>

      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryFirmFetchStatus,
            ()=> <DeliveryFirmProfile deliveryFirm={deliveryFirm} navLinks={NAV_LINKS} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>

      {
        deliveryFirm && 
        <Switch>
          <Route path={`${match.url}/reviews`} render={()=> <DeliveryFirmReviewsList />} />
          <Route path={match.url} render={()=> <DeliveryFirmRoutesList />} />
        </Switch>
      }

    </section>
  );
}
