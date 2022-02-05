import { DELIVERY_FIRM } from "../actions/deliveryFirmActions";
import { ORDER } from "../actions/orderActions";
import { REVIEW } from "../actions/reviewActions";
import { ROUTE } from "../actions/routeActions";
import { TRANSACTION } from "../actions/transactionActions";
import deliveryFirmState from "../states/deliveryFirmState";


export default function DeliveryFirmReducer(state, { type, payload }) {
  
  switch (type) {  
    
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
        ...deliveryFirmState,
        deliveryFirms: state.deliveryFirms,
        deliveryFirmsPage: state.deliveryFirmsPage,
        deliveryFirmsLoading: state.deliveryFirmsLoading,
        deliveryFirmsNumberOfPages: state.deliveryFirmsNumberOfPages,
        deliveryFirmsFetchStatus: state.deliveryFirmsFetchStatus
      }
      
    case DELIVERY_FIRM.FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryFirmID: payload.id,
        deliveryFirmLoading: payload.loading,
        deliveryFirmFetchStatus: payload.fetchStatus
      };
    
    case DELIVERY_FIRM.FETCHED:
      return {
        ...state,
        deliveryFirmLoading: false, 
        deliveryFirm: payload.deliveryFirm, 
        deliveryFirmID: payload.deliveryFirm.id,
        deliveryFirmFetchStatus: payload.fetchStatus
      };

    
    case ROUTE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        routesLoading: payload.loading,
        routesFetchStatus: payload.fetchStatus
      };
    
    case ROUTE.LIST_FETCHED:
      return {
        ...state,
        routesLoading: false,
        routesPage: state.routesPage+1,
        routesFetchStatus: payload.fetchStatus,
        routesNumberOfPages: payload.numberOfPages,
        routes: [...state.routes, ...payload.list],
      };

    case REVIEW.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviewsLoading: payload.loading,
        reviewsFetchStatus: payload.fetchStatus
      };

    case REVIEW.LIST_FETCHED:
      return {
        ...state,
        reviewsLoading: false,
        reviewsPage: state.reviewsPage+1,
        reviewsFetchStatus: payload.fetchStatus,
        reviewsNumberOfPages: payload.numberOfPages,
        reviews: [...state.reviews, ...payload.list],
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

    case REVIEW.CREATED:

      const review = payload;

      const summary = { ...state.deliveryFirm.review_summary };

      summary.total++;

      summary.ratings[review.rating-1] = summary.ratings[review.rating-1] + 1;

      const average = summary.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
      
      summary.average = average / summary.total;

      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          reviews: [ review ],
          review_summary: summary
        }
      };

    case REVIEW.UPDATED:

      const reviewCur = payload;

      const reviewPrev = state.deliveryFirm.reviews[0];

      const summaryY = { ...state.deliveryFirm.review_summary };

      summaryY.ratings[reviewCur.rating-1] = summaryY.ratings[reviewCur.rating-1] + 1;

      summaryY.ratings[reviewPrev.rating-1] = summaryY.ratings[reviewPrev.rating-1] - 1;

      const averageY = summaryY.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);

      summaryY.average = averageY / summaryY.total;
      
      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          reviews: [ reviewCur ],
          review_summary: summaryY,
        }
      };

    case REVIEW.DELETED:

      const reviewX = state.deliveryFirm.reviews[0];

      const summaryX = { ...state.deliveryFirm.review_summary };

      summaryX.total--;

      summaryX.ratings[reviewX.rating-1] = summaryX.ratings[reviewX.rating-1] - 1;

      if (summaryX.total > 0) {
        const averageX = summaryX.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
        summaryX.average = averageX / summaryX.total;
      } else {
        summaryX.average = 0;
      }

      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          reviews: undefined,
          review_summary: summaryX
        }
      };

    
    default:
      return state;
  }
}

