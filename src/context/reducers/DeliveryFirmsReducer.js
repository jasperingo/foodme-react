
import { DELIVERY_FIRM, FETCH_STATUSES } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialDeliveryFirmState } from "../AppInitialStates";

export default function DeliveryFirmsReducer(state, action) {
  
  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  
    
    case DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        deliveryFirms: {
          ...state.deliveryFirms,
          deliveryFirmsFetchStatus: action.payload
        }
      };
    
    case DELIVERY_FIRM.LIST_FETCHED :
      let status = fetchUpdater(
        state.deliveryFirms.deliveryFirmsPage, 
        action.payload.deliveryFirmsNumberOfPages, 
        state.deliveryFirms.deliveryFirms.length, 
        action.payload.deliveryFirms.length
      );
      
      const delv = state.deliveryFirms.deliveryFirms.filter(i=> i !== null);
      
      return {
        ...state,
        deliveryFirms: {
          deliveryFirmsFetchStatus: status,
          deliveryFirmsPage: state.deliveryFirms.deliveryFirmsPage+1,
          deliveryFirmsNumberOfPages: action.payload.deliveryFirmsNumberOfPages,
          deliveryFirms: [...delv, ...action.payload.deliveryFirms, null],
        }
      };

    case DELIVERY_FIRM.UNFETCH:
      return initialDeliveryFirmState;
      
    case DELIVERY_FIRM.FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryFirm: {
          ...state.deliveryFirm,
          deliveryFirmFetchStatus: action.payload
        }
      };
    
    case DELIVERY_FIRM.FETCHED:
      return {
        ...state,
        deliveryFirm: {
          deliveryFirm: action.payload, 
          deliveryFirmFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    default:
      return state;
  }
}