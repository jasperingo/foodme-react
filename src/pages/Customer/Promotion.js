
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import ProductItem from '../../components/ProductItem';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, PRODUCT, PROMOTION } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useDataRender, useDateFormat, useHasMoreToFetchViaScroll, useListRender, useMoneyFormat } from '../../context/AppHooks';
import ClockIcon from '../../icons/ClockIcon';
import ProductIcon from '../../icons/ProductIcon';
import StoreIcon from '../../icons/StoreIcon';

const getFetchStatusAction = (payload) => ({
  type: PROMOTION.FETCH_STATUS_CHANGED,
  payload
});

const getProductsFetchStatusAction = (payload) => ({
  type: PRODUCT.LIST_FETCH_STATUS_CHANGED,
  payload
});

function PromotionView({ promotion: { id, store, title, number_of_products, deduction_amount, deduction_percent, start_time, stop_time } }) {

  const { t } = useTranslation();

  const amount = useMoneyFormat(deduction_amount || -1);

  const { promotions: {
    products: {
      products,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, promotionsDispatch } = useAppContext();


  useEffect(()=> {
    
    async function fetchProducts() {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json?id=${id}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        promotionsDispatch({
          type: PRODUCT.LIST_FETCHED,
          payload: {
            products: data.data,
            productsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        promotionsDispatch(getProductsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts();

  }, [id, productsFetchStatus, promotionsDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    promotionsDispatch(getProductsFetchStatusAction(FETCH_STATUSES.LOADING));
  }


  return (
    <>
      <div className="container-x">
        <div className="py-4">
          <h3 className="font-bold text-2xl mb-1">{ title }</h3>
          <div className="bg-color-primary px-3 py-1 rounded-3xl inline-block mb-1">
            { (deduction_amount && <>- {amount}</>) || (deduction_percent && `- ${deduction_percent}%`) }
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-5 h-5" />
              <span>{ t('_extra.Start') }: </span> 
              <span>{ useDateFormat(start_time) }</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-5 h-5" />
              <span>{ t('_extra.End') }: </span>
              <span>{ useDateFormat(stop_time) }</span> 
            </div>
          </div>
          <div className="my-2">
            <div className="text-sm font-bold">{ t('_store.Store') }</div>
            <Link to={`/store/${store.id}/products`} className="flex gap-1 items-center">
              <StoreIcon classList="text-color-primary w-8 h-8" />
              <div>{ store.name }</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-x">
        <h4 className="font-bold text-xl text-color-gray mb-1">{ t('_product.product__Count', { count: number_of_products }) }</h4>
        
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
    </>
  );
}

export default function Promotion() {

  const ID = parseInt(useParams().pID);

  const {promotions: {
    promotion: {
      promotion,
      promotionFetchStatus
    }
  }, promotionsDispatch} = useAppContext();

  useEffect(()=>{

    async function fetchPromotion() {
      if (promotionFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}promotion.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        data.data.id = ID;
        
        promotionsDispatch({
          type: PROMOTION.FETCHED,
          payload: data.data
        });

      } catch (err) {
        promotionsDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    if (promotion !== null && ID !== promotion.id) {
      promotionsDispatch({ type: PROMOTION.UNFETCH });
    }

    fetchPromotion();

  }, [ID, promotion, promotionFetchStatus, promotionsDispatch]);

  function refetchPromotion() {
    if (promotionFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    promotionsDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      { 
        useDataRender(
          promotion, 
          promotionFetchStatus,
          ()=> <PromotionView promotion={promotion} />,
          (k)=> <div className="container-x"> <Loading /> </div>, 
          (k)=> <div className="container-x"> <Reload action={refetchPromotion} /> </div>,
        )
      }
    </section>
  );
}
