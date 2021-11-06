
import React, { useEffect } from 'react';
//import { useTranslation } from 'react-i18next';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_URL, useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES, STORE, PRODUCT, REVIEW, PROMOTION } from '../../context/AppActions';
import { useListRender, useDataRender, useHasMoreToFetchViaScroll } from '../../context/AppHooks';
import Tab from '../../components/Tab';
import Loading from '../../components/Loading';
import LocationIcon from '../../icons/LocationIcon';
import ReviewIcon from '../../icons/ReviewIcon';
import StarIcon from '../../icons/StarIcon';
import PhoneIcon from '../../icons/PhoneIcon';
import EmailIcon from '../../icons/EmailIcon';
import FilterIcon from '../../icons/FilterIcon';
import CategoriesIcon from '../../icons/CategoriesIcon';
import ProductIcon from '../../icons/ProductIcon';
import ProductItem from '../../components/ProductItem';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ReviewItem from '../../components/ReviewItem';
import Rater from '../../components/Rater';
import ReviewSummary from '../../components/ReviewSummary';
import DiscountIcon from '../../icons/DiscountIcon';
import { useTranslation } from 'react-i18next';
import MessageIcon from '../../icons/MessageIcon';
import PromotionItem from '../../components/PromotionItem';


const PROFILE_NAV_LINKS = [
  { title : '_product.Products', href: '/products' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_store.Promotions', href: '/promotions' }
];

const getStoreFetchStatusAction = (payload) => ({
  type: STORE.FETCH_STATUS_CHANGED,
  payload
});

const getProductFetchStatusAction = (payload) => ({
  type: STORE.PRODUCTS_FETCH_STATUS_CHANGED,
  payload
});

const getReviewsFetchStatusAction = (payload) => ({
  type: REVIEW.FETCH_STATUS_CHANGED,
  payload
});

const getPromotionsFetchStatusAction = (payload) => ({
  type: PROMOTION.LIST_FETCH_STATUS_CHANGED,
  payload
});

function StorePromotionsList() {

  const { ID } = useParams();

  const { store: {
    promotions: {
      promotions,
      promotionsPage,
      promotionsNumberOfPages,
      promotionsFetchStatus
    }
  }, storeDispatch } = useAppContext();


  useEffect(()=> {

    async function fetchPromotions() {
      if (promotionsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}promotions.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        storeDispatch({
          type: PROMOTION.LIST_FETCHED,
          payload: {
            promotions: data.data,
            promotionsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        storeDispatch(getPromotionsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchPromotions();

  }, [ID, promotionsFetchStatus, storeDispatch]);

  function refetchPromotions() {
    if (promotionsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    storeDispatch(getPromotionsFetchStatusAction(FETCH_STATUSES.LOADING));
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
                (item, i)=> <PromotionItem key={`prod-${i}`} promotion={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchPromotions} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" Icon={DiscountIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchPromotions} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
}

function StoreReviewsList() {

  const { ID } = useParams();

  const { store: {
    reviews: {
      reviews,
      reviewsPage,
      reviewsNumberOfPages,
      reviewsFetchStatus
    }
  }, storeDispatch } = useAppContext();

  useEffect(()=> {
    async function fetchReviews() {
      if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}reviews.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        storeDispatch({
          type: REVIEW.FETCHED,
          payload: {
            reviews: data.data,
            reviewsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        storeDispatch(getReviewsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchReviews();

  }, [ID, reviewsFetchStatus, storeDispatch]);

  function refetchReviews() {
    if (reviewsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    storeDispatch(getReviewsFetchStatusAction(FETCH_STATUSES.LOADING));
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
            <ReviewSummary />
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
                  (k)=> <li key={k}> <EmptyList text="_empty.No_review" Icon={StarIcon} /> </li>, 
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

  const { store: {
    products: {
      products,
      productsCategory,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, storeDispatch } = useAppContext();

  useEffect(()=> {
    async function fetchProducts() {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json?id=${ID}&category=${productsCategory}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        storeDispatch({
          type: STORE.PRODUCTS_FETCHED,
          payload: {
            products: data.data,
            productsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        storeDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts();

  }, [ID, productsFetchStatus, productsCategory, storeDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    storeDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function onFilterChange(value) {
    storeDispatch({
      type: PRODUCT.FILTER_CHANGED,
      payload: parseInt(value)
    });
  }
  
  return (
    <div>
      <div className="container-x">
        <div className="flex my-4">
          <FilterIcon classList="fill-current text-color" />
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
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={ProductIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
}



function StoreProfileItem({ Icon, data }) {
  return (
    <li className="inline-flex">
      <div className="bg-color-gray text-color flex items-center px-2 py-1 rounded mr-2 mb-2">
        <Icon classList="fill-current inline-block w-5 h-5 " />
        <span className="inline-block ml-1 text-sm">{ data }</span>
      </div>
    </li>
  );
}

function StoreProfile({ storeData }) {

  const { t } = useTranslation();

  return (
    <>

      <div className="flex items-center my-4">
        <img 
          src={ `/photos/${storeData.logo}` } 
          alt={ storeData.name } 
          className="w-10 h-10 md:w-16 md:h-16 border rounded-full" 
          />
        <h4 className="flex-grow font-bold ml-2 md:text-xl">{ storeData.name }</h4> 
        <div>
          <Link 
            to={`/messages/${storeData.id}`} 
            title={ t('_message.Message_store') }
            className="btn-color-primary rounded-full p-2 block"
            >
            <span className="sr-only">{ t('_message.Message_store') }</span>
            <MessageIcon classList="w-4 h-4" />
          </Link>
        </div>
      </div>

      <ul className="pt-3">

        <StoreProfileItem Icon={LocationIcon} data={ storeData.address } />

        <StoreProfileItem Icon={PhoneIcon} data={ storeData.phone } />

        <StoreProfileItem Icon={EmailIcon} data={ storeData.email } />

        <StoreProfileItem Icon={CategoriesIcon} data={ storeData.category } />

        <StoreProfileItem Icon={ReviewIcon} data={ storeData.rating } />

      </ul>

      <Tab items={PROFILE_NAV_LINKS} keyPrefix="store-tab" />

    </>
  );
}

export default function Store() {

  const ID = parseInt(useParams().ID);

  const match = useRouteMatch();

  const { store: {
    store: {
      store,
      storeFetchStatus
    }
  }, storeDispatch } = useAppContext();

  useEffect(()=> {
    async function fetchStore() {

      if (storeFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        data.data.id = ID;
        
        storeDispatch({
          type: STORE.FETCHED,
          payload: data.data
        });

      } catch (err) {
        storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    if (store !== null && ID !== store.id) {
      storeDispatch({
        type: STORE.UNFETCH
      });
    }

    fetchStore();

  }, [ID, store, storeFetchStatus, storeDispatch]);

  function refetchStore() {
    if (storeFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <div>
        <div className="container-x">
          { 
            useDataRender(
              store, 
              storeFetchStatus,
              (item, i)=> <StoreProfile storeData={store} />,
              (k)=> <Loading />, 
              (k)=> <Reload action={refetchStore} />,
            )
          }
        </div>
      </div>

      {
        store && 
        <Switch>
          <Route path={`${match.url}/products`} render={()=> <StoreProductsList categories={store.categories} />} />
          <Route path={`${match.url}/reviews`} render={()=> <StoreReviewsList />} />
          <Route path={`${match.url}/promotions`} render={()=> <StorePromotionsList />} />
        </Switch>
      }
      
    </section>
  );
}

