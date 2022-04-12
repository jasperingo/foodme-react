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
        deliveryFirmAdminID: payload.adminID
      };
    

    case DELIVERY_FIRM.LIST_UNFETCHED:
      return {
        ...state,
        deliveryFirms: deliveryFirmState.deliveryFirms,
        deliveryFirmsPage: deliveryFirmState.deliveryFirmsPage,
        deliveryFirmsError: deliveryFirmState.deliveryFirmsError,
        deliveryFirmsLoaded: deliveryFirmState.deliveryFirmsLoaded,
        deliveryFirmsLoading: deliveryFirmState.deliveryFirmsLoading,
        deliveryFirmsNumberOfPages: deliveryFirmState.deliveryFirmsNumberOfPages
      };

    case DELIVERY_FIRM.LIST_FETCHING:
      return {
        ...state,
        deliveryFirmsError: null,
        deliveryFirmsLoading: true
      };

    case DELIVERY_FIRM.LIST_ERROR_CHANGED:
      return {
        ...state,
        deliveryFirmsLoading: false,
        deliveryFirmsError: payload.error
      };
    
    case DELIVERY_FIRM.LIST_FETCHED:
      return {
        ...state,
        deliveryFirmsLoaded: true,
        deliveryFirmsLoading: false,
        deliveryFirmsPage: state.deliveryFirmsPage + 1,
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
        routesNumberOfPages: deliveryFirmState.routesNumberOfPages,

        orders: deliveryFirmState.orders,
        ordersPage: deliveryFirmState.ordersPage,
        ordersError: deliveryFirmState.ordersError,
        ordersLoaded: deliveryFirmState.ordersLoaded,
        ordersLoading: deliveryFirmState.ordersLoading,
        ordersNumberOfPages: deliveryFirmState.ordersNumberOfPages,

        transactions: deliveryFirmState.transactions,
        transactionsPage: deliveryFirmState.transactionsPage,
        transactionsError: deliveryFirmState.transactionsError,
        transactionsLoaded: deliveryFirmState.transactionsLoaded,
        transactionsLoading: deliveryFirmState.transactionsLoading,
        transactionsNumberOfPages: deliveryFirmState.transactionsNumberOfPages,

        transactionBalance: deliveryFirmState.transactionBalance,
        transactionBalanceError: deliveryFirmState.transactionBalanceError,
        transactionBalanceLoading: deliveryFirmState.transactionBalanceLoading,
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
      return {
        ...state,
        orders: deliveryFirmState.orders,
        ordersPage: deliveryFirmState.ordersPage,
        ordersError: deliveryFirmState.ordersError,
        ordersLoaded: deliveryFirmState.ordersLoaded,
        ordersLoading: deliveryFirmState.ordersLoading,
        ordersNumberOfPages: deliveryFirmState.ordersNumberOfPages
      };
    
    case ORDER.LIST_ERROR_CHANGED:
      return {
        ...state,
        ordersLoading: false,
        ordersError: payload.error
      };
    
    case ORDER.LIST_FETCHING:
      return {
        ...state,
        ordersError: null,
        ordersLoading: true
      };
      
    case ORDER.LIST_FETCHED:
      return {
        ...state,
        ordersLoaded: true,
        ordersLoading: false,
        ordersPage: state.ordersPage + 1,
        ordersNumberOfPages: payload.numberOfPages,
        orders: [...state.orders, ...payload.list],
      };
    
    
    case TRANSACTION.LIST_UNFETCHED:
      return {
        ...state,
        transactions: deliveryFirmState.transactions,
        transactionsPage: deliveryFirmState.transactionsPage,
        transactionsError: deliveryFirmState.transactionsError,
        transactionsLoaded: deliveryFirmState.transactionsLoaded,
        transactionsLoading: deliveryFirmState.transactionsLoading,
        transactionsNumberOfPages: deliveryFirmState.transactionsNumberOfPages
      };

    case TRANSACTION.LIST_FETCHING:
      return {
        ...state,
        transactionsError: null,
        transactionsLoading: true
      };

    case TRANSACTION.LIST_ERROR_CHANGED:
      return {
        ...state,
        transactionsLoading: false,
        transactionsError: payload.error
      };
    
    case TRANSACTION.LIST_FETCHED:
      return {
        ...state,
        transactionsLoaded: true,
        transactionsLoading: false,
        transactionsPage: state.transactionsPage + 1,
        transactionsNumberOfPages: payload.numberOfPages,
        transactions: [...state.transactions, ...payload.list],
      };


    case TRANSACTION.BALANCE_UNFETCHED:
      return {
        ...state,
        transactionBalance: deliveryFirmState.transactionBalance,
        transactionBalanceError: deliveryFirmState.transactionBalanceError,
        transactionBalanceLoading: deliveryFirmState.transactionBalanceLoading,
      };

    case TRANSACTION.BALANCE_FETCHING:
      return {
        ...state,
        transactionBalanceError: null,
        transactionBalanceLoading: true
      };

      case TRANSACTION.BALANCE_ERROR_CHANGED:
        return {
          ...state,
          transactionBalanceLoading: false,
          transactionBalanceError: payload.error
        };
    
    case TRANSACTION.BALANCE_FETCHED:
      return {
        ...state,
        transactionBalanceLoading: false,
        transactionBalance: payload.balance
      };

    case TRANSACTION.BALANCE_WITHDRAWN:
      return {
        ...state,
        transactionBalance: state.transactionBalance - payload.amount,
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
