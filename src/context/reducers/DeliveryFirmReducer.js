import { useReviewCreatedSummary, useReviewDeletedSummary, useReviewUpdatedSummary } from "../../hooks/review/reviewSummaryHook";
import { DELIVERY_FIRM } from "../actions/deliveryFirmActions";
import { DELIVERY_ROUTE } from "../actions/deliveryRouteActions";
import { ORDER } from "../actions/orderActions";
import { REVIEW } from "../actions/reviewActions";
import { TRANSACTION } from "../actions/transactionActions";
import deliveryFirmState from "../states/deliveryFirmState";

export default function DeliveryFirmReducer(state, { type, payload }) {

  const onReviewCreated = useReviewCreatedSummary();
  const onReviewUpdated = useReviewUpdatedSummary();
  const onReviewDeleted = useReviewDeletedSummary();
  
  switch (type) {  

    case DELIVERY_FIRM.UNAUTHED:
      return { ...deliveryFirmState };

    case DELIVERY_FIRM.AUTHED:
      return {
        ...state,
        deliveryFirmToken: payload.token,
        deliveryFirm: payload.deliveryFirm,
        deliveryFirmAdminID: payload.adminID,
        deliveryFirmFetchStatus: payload.fetchStatus
      };
    
    case DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryFirmsLoading: payload.loading,
        deliveryFirmsFetchStatus: payload.fetchStatus
      };
    
    case DELIVERY_FIRM.LIST_FETCHED:
      return {
        ...state,
          deliveryFirmsLoading: false,
          deliveryFirmsPage: state.deliveryFirmsPage+1,
          deliveryFirmsFetchStatus: payload.fetchStatus,
          deliveryFirmsNumberOfPages: payload.numberOfPages,
          deliveryFirms: [...state.deliveryFirms, ...payload.list],
      };


    case DELIVERY_FIRM.UNFETCHED:
      return {
        ...state,
        deliveryFirm: deliveryFirmState.deliveryFirm,
        deliveryFirmID: deliveryFirmState.deliveryFirmID,
        deliveryFirmToken: deliveryFirmState.deliveryFirmToken,
        deliveryFirmAdminID: deliveryFirmState.deliveryFirmAdminID,
        deliveryFirmError: deliveryFirmState.deliveryFirmError,
        deliveryFirmLoading: deliveryFirmState.deliveryFirmLoading,

        routes: deliveryFirmState.routes,
        routesPage: deliveryFirmState.routesPage,
        routesError: deliveryFirmState.routesError,
        routesLoaded: deliveryFirmState.routesLoaded,
        routesLoading: deliveryFirmState.routesLoading,
        routesNumberOfPages: deliveryFirmState.routesNumberOfPages
      }
      
    case DELIVERY_FIRM.FETCHING:
      return {
        ...state,
        deliveryFirmError: null,
        deliveryFirmLoading: true
      };

    case DELIVERY_FIRM.ERROR_CHANGED:
      return {
        ...state,
        deliveryFirmLoading: false,
        deliveryFirmID: payload.id,
        deliveryFirmError: payload.error
      };
    
    
    case DELIVERY_FIRM.FETCHED:
      return {
        ...state,
        deliveryFirmLoading: false, 
        deliveryFirmID: payload.id,
        deliveryFirm: payload.deliveryFirm
      };

    
    case DELIVERY_ROUTE.LIST_UNFETCHED:
      return {
        ...state,
        routes: deliveryFirmState.routes,
        routesPage: deliveryFirmState.routesPage,
        routesError: deliveryFirmState.routesError,
        routesLoaded: deliveryFirmState.routesLoaded,
        routesLoading: deliveryFirmState.routesLoading,
        routesNumberOfPages: deliveryFirmState.routesNumberOfPages
      };

    case DELIVERY_ROUTE.LIST_FETCHING:
      return {
        ...state,
        routesError: null,
        routesLoading: true
      };
    
    case DELIVERY_ROUTE.LIST_ERROR_CHANGED:
      return {
        ...state,
        routesLoading: false,
        routesError: payload.error
      };
    
    case DELIVERY_ROUTE.LIST_FETCHED:
      return {
        ...state,
        routesLoaded: true,
        routesLoading: false,
        routesPage: state.routesPage + 1,
        routesNumberOfPages: payload.numberOfPages,
        routes: [...state.routes, ...payload.list],
      };


    case DELIVERY_ROUTE.BASE_LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryBaseRoutesLoading: payload.loading,
        deliveryBaseRoutesFetchStatus: payload.fetchStatus
      };
    
    case DELIVERY_ROUTE.BASE_LIST_FETCHED:
      return {
        ...state,
        deliveryBaseRoutesLoading: false,
        deliveryBaseRoutesPage: state.deliveryBaseRoutesPage+1,
        deliveryBaseRoutesFetchStatus: payload.fetchStatus,
        deliveryBaseRoutesNumberOfPages: payload.numberOfPages,
        deliveryBaseRoutes: [...state.deliveryBaseRoutes, ...payload.list],
      };


      case REVIEW.LIST_UNFETCHED:
        return {
          ...state,
          reviews: deliveryFirmState.reviews,
          reviewsPage: deliveryFirmState.reviewsPage,
          reviewsError: deliveryFirmState.reviewsError,
          reviewsLoaded: deliveryFirmState.reviewsLoaded,
          reviewsLoading: deliveryFirmState.reviewsLoading,
          reviewsNumberOfPages: deliveryFirmState.reviewsNumberOfPages
        };
  
      case REVIEW.LIST_FETCHING:
        return {
          ...state,
          reviewsError: null,
          reviewsLoading: true
        };
  
      case REVIEW.LIST_ERROR_CHANGED:
        return {
          ...state,
          reviewsLoading: false,
          reviewsError: payload.error
        };
  
      case REVIEW.LIST_FETCHED:
        return {
          ...state,
          reviewsLoaded: true,
          reviewsLoading: false,
          reviewsPage: state.reviewsPage + 1,
          reviewsNumberOfPages: payload.numberOfPages,
          reviews: [...state.reviews, ...payload.list],
        };
        

    case ORDER.LIST_UNFETCHED:
    case ORDER.LIST_STATUS_FILTER_CHANGED:
      return {
        ...state,
        ordersPage: 1,
        ordersLoading: true,
        ordersNumberOfPages: 0,
        orders: deliveryFirmState.orders,
        ordersFetchStatus: deliveryFirmState.ordersFetchStatus,
      };

    case ORDER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        ordersLoading: payload.loading,
        ordersFetchStatus: payload.fetchStatus,
      };
      
    case ORDER.LIST_FETCHED:
      return {
        ...state,
        ordersLoading: false,
        ordersPage: state.ordersPage+1,
        ordersFetchStatus: payload.fetchStatus,
        ordersNumberOfPages: payload.numberOfPages,
        orders: [...state.orders, ...payload.list],
      };
  
    case TRANSACTION.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactionsLoading: payload.loading,
        transactionsFetchStatus: payload.fetchStatus
      };
    
    case TRANSACTION.LIST_FETCHED:
      return {
        ...state,
        transactionsLoading: false,
        transactionsPage: state.transactionsPage+1,
        transactionsFetchStatus: payload.fetchStatus,
        transactionsNumberOfPages: payload.numberOfPages,
        transactions: [...state.transactions, ...payload.list],
      };

    case TRANSACTION.BALANCE_UNFETCHED:
      return {
        ...state,
        transactionBalanceLoading: true,
        transactionBalance: deliveryFirmState.transactionBalance,
        transactionBalanceFetchStatus: deliveryFirmState.transactionBalanceFetchStatus
      };

    case TRANSACTION.BALANCE_FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactionBalanceLoading: payload.loading,
        transactionBalanceFetchStatus: payload.fetchStatus
      };
    
    case TRANSACTION.BALANCE_FETCHED:
      return {
        ...state,
        transactionBalanceLoading: false,
        transactionBalance: payload.balance,
        transactionBalanceFetchStatus: payload.fetchStatus
      };

    case REVIEW.CREATED:

      const review = payload.review;

      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          reviews: [ review ],
          review_summary: onReviewCreated(review, { ...state.deliveryFirm.review_summary })
        }
      };

    case REVIEW.UPDATED:

      const reviewCur = payload.review;
      
      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          reviews: [ reviewCur ],
          review_summary: onReviewUpdated(reviewCur, state.deliveryFirm.reviews[0], { ...state.deliveryFirm.review_summary }),
        }
      };

    case REVIEW.DELETED:
      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          reviews: undefined,
          review_summary: onReviewDeleted(state.deliveryFirm.reviews[0], { ...state.deliveryFirm.review_summary })
        }
      };

    
    default:
      return state;
  }
}
