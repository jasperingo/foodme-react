
import React, { useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppContext } from '../context/AppContext';
import { 
  FETCH_STATUSES, 
  STORE, 
  PRODUCT, 
  getStoreFetchStatusAction, 
  getProductsListFetchStatusAction, 
  getReviewsListFetchStatusAction, 
  getPromotionsListFetchStatusAction 
} from '../context/AppActions';
import { useListRender, useDataRender, useHasMoreToFetchViaScroll } from '../context/AppHooks';
import Tab from '../components/Tab';
import Loading from '../components/Loading';
import ProductItem from '../components/ProductItem';
import Reload from '../components/Reload';
import EmptyList from '../components/EmptyList';
import FetchMoreButton from '../components/FetchMoreButton';
import ReviewItem from '../components/ReviewItem';
import Rater from '../components/Rater';
import ReviewSummary from '../components/ReviewSummary';
import PromotionItem from '../components/PromotionItem';
import { 
  categoryIcon, 
  editIcon, 
  emailIcon, 
  filterIcon, 
  locationIcon, 
  messageIcon, 
  phoneIcon, 
  productIcon, 
  promotionIcon, 
  reviewIcon 
} from '../assets/icons';
import Icon from '@mdi/react';
import StoreApi from '../api/StoreApi';
import ProductApi from '../api/ProductApi';
import ReviewApi from '../api/ReviewApi';
import PromotionApi from '../api/PromotionApi';
import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';
import AdminApp from '../apps/AdminApp';

const PROFILE_NAV_LINKS = [
  { title : '_product.Products', href: '' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_store.Promotions', href: '/promotions' }
];

function StorePromotionsList() {

  const { ID } = useParams();

  const { stores: {
    promotions: {
      promotions,
      promotionsPage,
      promotionsNumberOfPages,
      promotionsFetchStatus
    }
  }, storesDispatch } = useAppContext();

  useEffect(()=> {
    if (promotionsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new PromotionApi();
      api.getListByStore(ID, promotionsPage, storesDispatch);
    }
  }, [ID, promotionsFetchStatus, promotionsPage, storesDispatch]);

  function refetchPromotions() {
    if (promotionsFetchStatus !== FETCH_STATUSES.LOADING) 
      storesDispatch(getPromotionsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return (
    <div>
      <div className="container-x">
        <InfiniteScroll 
          dataLength={promotions.length}
          next={refetchPromotions}
          hasMore={useHasMoreToFetchViaScroll(promotionsPage, promotionsNumberOfPages, promotionsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                promotions, 
                promotionsFetchStatus,
                (item, i)=> <PromotionItem key={`promotion-${i}`} promotion={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchPromotions} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={promotionIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchPromotions} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
}

function StoreReviewsList({ ratings }) {

  const { ID } = useParams();

  const { stores: {
    reviews: {
      reviews,
      reviewsPage,
      reviewsNumberOfPages,
      reviewsFetchStatus
    }
  }, storesDispatch } = useAppContext();

  useEffect(()=> {
    if (reviewsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ReviewApi();
      api.getListByStore(ID, reviewsPage, storesDispatch);
    }
  }, [ID, reviewsFetchStatus, reviewsPage, storesDispatch]);

  function refetchReviews() {
    if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
      storesDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function newRate(rate, text) {
    alert('Rate store: '+rate+' with note: '+text);
  }
  
  return (
    <div>
      <div className="container-x">
        
        <div className="md:flex md:gap-10">
          <div className="flex-grow md:text-center">
            <Rater 
              title="_review.Rate_this_store" 
              onRateSubmitted={newRate}
              />
          </div>
          <div className="flex-grow">
            <ReviewSummary 
              ratings={ratings}
             />
          </div>
        </div>

        <InfiniteScroll 
          dataLength={reviews.length}
          next={refetchReviews}
          hasMore={useHasMoreToFetchViaScroll(reviewsPage, reviewsNumberOfPages, reviewsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                reviews, 
                reviewsFetchStatus,
                (item, i)=> <li key={`prod-${i}`}> <ReviewItem review={item} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchReviews} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchReviews} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
}

function StoreProductsList({ categories }) {

  const { ID } = useParams();

  const { stores: {
    products: {
      products,
      productsCategory,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, storesDispatch } = useAppContext();

  useEffect(()=> {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi();
      api.getListByStore(ID, productsPage, productsCategory, storesDispatch);
    }
  }, [ID, productsFetchStatus, productsCategory, productsPage, storesDispatch]);

  function refetchProducts() {
    if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
      storesDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function onFilterChange(value) {
    storesDispatch({
      type: PRODUCT.FILTER_CHANGED,
      payload: parseInt(value)
    });
  }
  
  return (
    <div>
      <div className="container-x">
        <div className="flex my-4">
          <Icon path={filterIcon} className="text-color w-6 h-6" />
          <select 
            className="bg-color-gray ml-1 p-1 rounded" 
            onChange={(e)=> onFilterChange(e.target.value)}
            value={productsCategory}
            >
            {
              categories.map((item, i)=> (
                <option 
                  key={i} 
                  value={item.id}
                  >
                  { item.name }
                </option>
              ))
            }
          </select>
        </div>
        
        <InfiniteScroll 
          dataLength={products.length}
          next={refetchProducts}
          hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                products, 
                productsFetchStatus,
                (item, i)=> <li key={`prod-${i}`}> <ProductItem prod={item} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={productIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
}


function StoreProfile({ appType, store: { photo, name, id, phone_number, email, category, sub_category, rating, address: {state, city, street } } }) {

  const links = [
    {
      href: `/messages/${id}`,
      title: '_message.Message',
      icon: messageIcon
    }
  ]

  if (appType === AdminApp.TYPE) {
    links.push({
      href: `/store/${id}/update`,
      title: '_extra.Edit',
      icon: editIcon
    });
  }

  return (
    <div>
      <div className="container-x">

        <ProfileHeader 
          photo={`/photos/store/${photo}`} 
          name={name} 
          links={links} 
          />

        <ProfileDetails 
          details={[
            {
              icon: locationIcon,
              data: `${street}, ${city}, ${state}`
            },
            {
              icon: phoneIcon,
              data: phone_number
            },
            {
              icon: emailIcon,
              data: email
            },
            {
              icon: categoryIcon,
              data: `${category}, ${sub_category}`
            },
            {
              icon: reviewIcon,
              data: rating
            }
          ]}
          />

        <Tab items={PROFILE_NAV_LINKS} keyPrefix="store-tab" />

      </div>
    </div>
  );
}

export default function Store({ appType }) {

  const ID = parseInt(useParams().ID);

  const match = useRouteMatch();

  const { stores: {
    store: {
      store,
      storeFetchStatus
    }
  }, storesDispatch } = useAppContext();

  useEffect(()=> {
    if (store !== null && ID !== store.id) {
      storesDispatch({ type: STORE.UNFETCH });
    } else if (storeFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new StoreApi();
      api.get(ID, storesDispatch);
    }
  }, [ID, store, storeFetchStatus, storesDispatch]);

  function refetchStore() {
    if (storeFetchStatus !== FETCH_STATUSES.LOADING) 
      storesDispatch(getStoreFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      { 
        useDataRender(
          store, 
          storeFetchStatus,
          ()=> <StoreProfile store={store} appType={appType} />,
          ()=> <Loading />, 
          ()=> <Reload action={refetchStore} />,
        )
      }

      {
        store && 
        <Switch>
          <Route path={`${match.url}/reviews`} render={()=> <StoreReviewsList ratings={store.rating} />} />
          <Route path={`${match.url}/promotions`} render={()=> <StorePromotionsList />} />
          <Route path={match.url} render={()=> <StoreProductsList categories={store.categories} />} />
        </Switch>
      }
    </section>
  );
}

