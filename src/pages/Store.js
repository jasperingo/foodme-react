
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Tab from '../components/Tab';
import Loading from '../components/Loading';
//import ProductItem from '../components/list_item/ProductItem';
import Reload from '../components/Reload';
// import EmptyList from '../components/EmptyList';
// import FetchMoreButton from '../components/FetchMoreButton';
// import ReviewItem from '../components/ReviewItem';
//import Rater from '../components/Rater';
// import ReviewSummary from '../components/ReviewSummary';
// import PromotionItem from '../components/PromotionItem';
import { 
  categoryIcon, 
  //editIcon, 
  emailIcon, 
  locationIcon, 
  messageIcon, 
  //orderIcon, 
  phoneIcon, 
  //productIcon, 
  //promotionIcon, 
  reviewIcon, 
  //transactionIcon
} from '../assets/icons';
//import Icon from '@mdi/react';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileHeader from '../components/profile/ProfileHeader';
// import OrderItem from '../components/list_item/OrderItem';
// import TransactionItem from '../components/list_item/TransactionItem';
import { useStoreFetch } from '../hooks/store/storeFetchHook';
import NotFound from '../components/NotFound';
import Forbidden from '../components/Forbidden';
import { useRenderOnDataFetched } from '../hooks/viewHook';
import ProductList from '../components/profile/section/ProductList';
import { useStoreProductList } from '../hooks/store/storeProductListHook';

const PROFILE_NAV_LINKS = [
  { title : '_product.Products', href: '' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_store.Promotions', href: '/promotions' },
  { title : '_order.Orders', href: '/orders' },
  { title : '_transaction.Transactions', href: '/transactions' }
];

// function Transactions() {
  
//   const { ID } = useParams();

//   const { 
//     user: { user }, 
//     stores: {
//       transactions: {
//         transactions,
//         transactionsFetchStatus,
//         transactionsPage,
//         transactionsNumberOfPages
//       }
//     }, 
//     storesDispatch 
//   } = useAppContext();

//   useEffect(()=>{
//     if (transactionsFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new TransactionApi(user.api_token);
//       api.getListByStore(ID, transactionsPage, storesDispatch);
//     }
//   });

//   function refetchTransactions() {
//     if (transactionsFetchStatus !== FETCH_STATUSES.LOADING) 
//       storesDispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }

//   return (
//     <div>
//       <div className="container-x">
//         <InfiniteScroll
//           dataLength={transactions.length}
//           next={refetchTransactions}
//           hasMore={useHasMoreToFetchViaScroll(transactionsPage, transactionsNumberOfPages, transactionsFetchStatus)}
//           >
//           <ul className="list-2-x">
//             { 
//               useListRender(
//                 transactions, 
//                 transactionsFetchStatus,
//                 (item, i)=> <TransactionItem key={`transaction-${i}`} transaction={item} />, 
//                 (k)=> <li key={k}> <Loading /> </li>, 
//                 (k)=> <li key={k}> <Reload action={refetchTransactions} /> </li>,
//                 (k)=> <li key={k}> <EmptyList text="_empty.No_transaction" icon={transactionIcon} /> </li>, 
//                 (k)=> <li key={k}> <FetchMoreButton action={refetchTransactions} /> </li>,
//               )
//             }
//           </ul>
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// }

// function Orders() {

//   const { ID } = useParams();
  
//   const { 
//     user: { user }, 
//     stores: {
//       orders: {
//         orders,
//         ordersFetchStatus,
//         ordersPage,
//         ordersNumberOfPages
//       }
//     }, 
//     storesDispatch 
//   } = useAppContext();

//   useEffect(()=> {
//     if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new OrderApi(user.api_token);
//       api.getListByStore(ID, ordersPage, storesDispatch);
//     }
//   });

//   function refetchOrders() {
//     if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
//       storesDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }

//   return (
//     <div>
//        <div className="container-x">
          
//         <InfiniteScroll
//           dataLength={orders.length}
//           next={refetchOrders}
//           hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
//           >
//           <ul className="list-2-x">
//             { 
//               useListRender(
//                 orders, 
//                 ordersFetchStatus,
//                 (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />, 
//                 (k)=> <li key={k}> <Loading /> </li>, 
//                 (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
//                 (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
//                 (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
//               )
//             }
//           </ul>
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// }

// function StorePromotionsList() {

//   const { ID } = useParams();

//   const { stores: {
//     promotions: {
//       promotions,
//       promotionsPage,
//       promotionsNumberOfPages,
//       promotionsFetchStatus
//     }
//   }, storesDispatch } = useAppContext();

//   useEffect(()=> {
//     if (promotionsFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new PromotionApi();
//       api.getListByStore(ID, promotionsPage, storesDispatch);
//     }
//   }, [ID, promotionsFetchStatus, promotionsPage, storesDispatch]);

//   function refetchPromotions() {
//     if (promotionsFetchStatus !== FETCH_STATUSES.LOADING) 
//       storesDispatch(getPromotionsListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }
  
//   return (
//     <div>
//       <div className="container-x">
//         <InfiniteScroll 
//           dataLength={promotions.length}
//           next={refetchPromotions}
//           hasMore={useHasMoreToFetchViaScroll(promotionsPage, promotionsNumberOfPages, promotionsFetchStatus)}
//           >
//           <ul className="list-x">
//             { 
//               useListRender(
//                 promotions, 
//                 promotionsFetchStatus,
//                 (item, i)=> <PromotionItem key={`promotion-${i}`} promotion={item} />, 
//                 (k)=> <li key={k}> <Loading /> </li>, 
//                 (k)=> <li key={k}> <Reload action={refetchPromotions} /> </li>,
//                 (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={promotionIcon} /> </li>, 
//                 (k)=> <li key={k}> <FetchMoreButton action={refetchPromotions} /> </li>,
//               )
//             }
//           </ul>
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// }

// function StoreReviewsList({ ratings }) {

//   const { ID } = useParams();

//   const { stores: {
//     reviews: {
//       reviews,
//       reviewsPage,
//       reviewsNumberOfPages,
//       reviewsFetchStatus
//     }
//   }, storesDispatch } = useAppContext();

//   useEffect(()=> {
//     if (reviewsFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new ReviewApi();
//       api.getListByStore(ID, reviewsPage, storesDispatch);
//     }
//   }, [ID, reviewsFetchStatus, reviewsPage, storesDispatch]);

//   function refetchReviews() {
//     if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
//       storesDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING));
//   }

//   function newRate(rate, text) {
//     alert('Rate store: '+rate+' with note: '+text);
//   }
  
//   return (
//     <div>
//       <div className="container-x">
        
//         <div className="md:flex md:gap-10">
//           <div className="flex-grow md:text-center">
//             <Rater 
//               title="_review.Rate_this_store" 
//               onRateSubmitted={newRate}
//               />
//           </div>
//           <div className="flex-grow">
//             <ReviewSummary 
//               ratings={ratings}
//              />
//           </div>
//         </div>

//         <InfiniteScroll 
//           dataLength={reviews.length}
//           next={refetchReviews}
//           hasMore={useHasMoreToFetchViaScroll(reviewsPage, reviewsNumberOfPages, reviewsFetchStatus)}
//           >
//           <ul className="list-x">
//             { 
//               useListRender(
//                 reviews, 
//                 reviewsFetchStatus,
//                 (item, i)=> <li key={`prod-${i}`}> <ReviewItem review={item} /> </li>, 
//                 (k)=> <li key={k}> <Loading /> </li>, 
//                 (k)=> <li key={k}> <Reload action={refetchReviews} /> </li>,
//                 (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>, 
//                 (k)=> <li key={k}> <FetchMoreButton action={refetchReviews} /> </li>,
//               )
//             }
//           </ul>
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// }

function StoreProductsList() {

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch
  ] = useStoreProductList();
  
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


function Profile(
  { 
    isAdmin,
    store: { 
      id,
      user: {
        photo, 
        name,  
        phone_number, 
        email, 
        addresses: [
          { 
            state, 
            city, 
            street 
          } 
        ]
      }, 
      sub_category,
      review_summary
    } 
  }
) {

  return (
    <div>
      
      <ProfileHeader 
        photo={photo.href}
        name={name} 
        links={[
          {
            href: `/messages/${id}`,
            title: '_message.Message',
            icon: messageIcon
          }
        ]} 
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
            data: `${sub_category.name}, ${sub_category.category.name}, `
          },
          {
            icon: reviewIcon,
            data: review_summary.average.toFixed(1)
          }
        ]}
        />

      <Tab 
        keyPrefix="store-tab" 
        items={
          PROFILE_NAV_LINKS.filter(
            i=> (i.href !== '/orders' && i.href !== '/transactions') || ((i.href === '/orders' || i.href === '/transactions') && isAdmin)
          )
        } 
        />

    </div>
  );
}


export default function Store() {

  const match = useRouteMatch();

  const [
    store, 
    storeFetchStatus, 
    refetch
  ] = useStoreFetch();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            storeFetchStatus,
            ()=> <Profile store={store} />,
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
          {/* <Route path={`${match.url}/transactions`} render={()=> <Transactions />} />
          <Route path={`${match.url}/orders`} render={()=> <Orders />} />
          <Route path={`${match.url}/reviews`} render={()=> <StoreReviewsList ratings={store.rating} />} />
          <Route path={`${match.url}/promotions`} render={()=> <StorePromotionsList />} /> */}
          <Route path={match.url} render={()=> <StoreProductsList />} />
        </Switch>
      }
    </section>
  );
}

