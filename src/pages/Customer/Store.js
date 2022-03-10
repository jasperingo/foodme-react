
import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import { categoryIcon } from '../../assets/icons';
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
import { useReviewUpdate } from '../../hooks/review/reviewUpdateHook';
import { useReviewDelete } from '../../hooks/review/reviewDeleteHook';
import { useReviewCreate } from '../../hooks/review/reviewCreateHook';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useRenderListFooter } from '../../hooks/viewHook';
import SelectFilter from '../../components/filter/SelectFilter';

const NAV_LINKS = [
  { title : '_extra.Menu', href: '' },
  { title : '_product.Products', href: '/products' },
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

  const onReviewUpdate = useReviewUpdate();

  const onReviewDelete = useReviewDelete({ store: true });

  const onReviewCreate = useReviewCreate({ store: store.id });

  return (
    <>
      <div className="container-x">

        <ReviewRaterAndSummary
          onReviewCreate={onReviewCreate} 
          onReviewUpdate={onReviewUpdate}
          onReviewDelete={onReviewDelete}
          summary={store.review_summary}
          title="_review.Rate_this_store"
          review={customerToken === null || !store?.reviews?.length ? null : store.reviews[0]}
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

function StoreProductsListList() {

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

function StoreProductsList({ menu }) {

  const [
    categories, 
    categoriesFetchStatus, 
    refetchCategories
  ] = useProductCategoryList(true);
  
  return useRenderOnDataFetched(
    categoriesFetchStatus,
    ()=> (
      <>
        <div className="container-x">
          <SelectFilter options={categories.map(i=> i.name)} value={menu} onFilterChange={()=> alert(99934)} /> 
        </div>
        <StoreProductsListList />
      </>
    ),
    ()=> <Loading />,
    ()=> <Reload action={refetchCategories} />,
  );
}

function StoreProductCategoriesList({ onSelect }) {

  const [
    products, 
    productsFetchStatus, 
    refetchProducts
  ] = useProductCategoryList(true);

  return (
    <div>
      <div className="container-x">
        <SingleList
          data={products}
          className="grid grid-cols-3 gap-4 p-1"
          renderDataItem={(item)=> (
            <li key={`category-${item.id}`}>
              <button className="block shadow" onClick={()=> onSelect(item.name)}>
                <img 
                  src={item.photo.href} 
                  alt={item.name} 
                  width="100" 
                  height="100" 
                  className="w-full mb-1 h-20 block mx-auto rounded lg:h-52 lg:w-full lg:mb-1"
                  />
                <div className="p-1 truncate overflow-ellipsis">{ item.name }</div>
              </button>
            </li>
          )}
          footer={useRenderListFooter(
            productsFetchStatus,
            ()=> <li key="category-footer" className="col-span-3"> <Loading /> </li>, 
            ()=> <li key="category-footer" className="col-span-3"> <Reload action={refetchProducts} /> </li>,
            ()=> <li key="category-footer" className="col-span-3"> <EmptyList text="_empty.No_category" icon={categoryIcon} /> </li>
          )}
          />
      </div>
    </div>
  );
}

export default function Store() {

  const match = useRouteMatch();

  const history = useHistory();

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

  const [menu, setMenu] = useState('_extra.All');

  function onMenuChoosen(value) {
    setMenu(value);
    history.push(`${match.url}/products`);
  }

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
          <Route path={`${match.url}/products`} render={()=> <StoreProductsList menu={menu} />} />
          <Route path={match.url} render={()=> <StoreProductCategoriesList onSelect={onMenuChoosen} />} />
        </Switch>
      }

    </section>
  );
}

