
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Link, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { notFoundIcon, productIcon, weightIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import Forbidden from '../../components/Forbidden';
import ReviewList from '../../components/list/ReviewList';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProductProfile from '../../components/profile/ProductProfile';
import Reload from '../../components/Reload';
import ReviewSummary from '../../components/review/ReviewSummary';
import Tab from '../../components/Tab';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import { useMoneyFormatter } from '../../hooks/viewHook';

const NAV_LINKS = [
  { title : '_product.Product_variants', href: '' },
  { title : '_extra.Reviews', href: '/reviews' }
];

function ProductReviewList() {

  const {
    store: { 
      store: {
        storeToken
      }
    },
    product: {
      product: {
        product
      } 
    }
  } = useAppContext();

  const [
    fetchProductReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages,
  ] = useProductReviewList(storeToken);
  
  useEffect(
    function() { 
      if (!reviewsLoaded && reviewsError === null) 
        fetchProductReviews(product.id); 
    },
    [product.id, reviewsLoaded, reviewsError, fetchProductReviews]
  );
  
  return (
    <>

      <div className="container-x">
      
        <ReviewSummary summary={product.review_summary} />

      </div>

      <ReviewList
        single={false}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        fetchReviews={()=> fetchProductReviews(product.id)}
        />
    </>
  );
}

function ProductVariantList() {

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();

  const {
    product: {
      product: {
        product
      } 
    }
  } = useAppContext();

  return (
    <div className="container-x">

      <AddButton text="_product.Add_product_variant" href={`/product-variant/create?product=${product.id}`} />

      <SingleList
        data={product.product_variants}
        className="list-2-x"
        renderDataItem={(item)=> (
          <li key={`product-variant-${item.id}`}>
            <Link to={`/product-variant/${item.id}`} className="block rounded mb-4 hover:bg-color-gray-h lg:p-2 lg:shadow">
              
              <div className="font-bold text-xl mb-1">{ item.name }</div>

              <div className="text-color-primary mb-1">{ moneyFormat(item.price) }</div>
                
              <div className="flex justify-between gap-2 items-center">
                <div className="bg-color-gray px-2 rounded">
                  { t('_product._unit_quauntity_available', { unit: item.quantity }) }
                </div>

                <div className="flex gap-1 items-center text-color-gray">
                  <Icon path={weightIcon} className="w-5 h-5" />
                  <span>{ item.weight } kg</span>
                </div>
              </div>

              {
                !item.available &&
                <div className="text-sm flex gap-1 items-center w-full bg-red-500 mt-2 py-1 px-2 rounded">
                  <Icon path={notFoundIcon} className="w-4 h-4" />
                  <span>{ t('_product._not_available_message') }</span>
                </div>
              }

            </Link>
          </li>
        )}
        footer={
          (
            product.product_variants.length === 0 && 
            <li key="product-variant-footer" className="list-2-x-col-span"> 
              <EmptyList icon={productIcon} text="_empty.No_product_variant" /> 
            </li>
          ) || null
        }
        />
    </div>
  );
}

export default function Product() {

  const { ID } = useParams();

  const match = useRouteMatch();

  const {
    store: { 
      store: {
        storeToken
      }
    } 
  } = useAppContext();

  const [
    fetchProduct,
    product,
    productLoading,
    productError,
    productID,
    unfetchProduct
  ] = useProductFetch(storeToken);

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Product',
    topNavPaths: ['/cart', '/search']
  });

  useEffect(
    function() {
      if ((product !== null || productError !== null) && productID !== ID) 
        unfetchProduct();
      else if (product === null && productError === null)
        fetchProduct(ID);
    },
    [ID, product, productError, productID, fetchProduct, unfetchProduct]
  );
  
  return (
    <section>

      { 
        product !== null && 
        <>
          <ProductProfile isStore={true} product={product} /> 

          <div className="container-x">
            <Tab keyPrefix="product-tab" items={NAV_LINKS} />
          </div>

          <Switch>
            <Route path={`${match.url}/reviews`} render={()=> <ProductReviewList />} />
            <Route path={match.url} render={()=> <ProductVariantList />} />
          </Switch>
        </>
      }

      {
        product === null &&
        <div className="container-x">
          { productLoading && <Loading /> }
          { productError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
          { productError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
          { productError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchProduct(ID)} /> }
          { productError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchProduct(ID)} /> }
        </div>
      }

    </section>
  );
}
