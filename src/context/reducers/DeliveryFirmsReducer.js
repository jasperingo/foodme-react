
import { DELIVERY_FIRM } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";

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
      
      const cus = state.deliveryFirms.deliveryFirms.filter(i=> i !== null);
      
      return {
        ...state,
        deliveryFirms: {
          deliveryFirmsFetchStatus: status,
          deliveryFirmsPage: state.deliveryFirms.deliveryFirmsPage+1,
          deliveryFirmsNumberOfPages: action.payload.deliveryFirmsNumberOfPages,
          deliveryFirms: [...cus, ...action.payload.deliveryFirms, null],
        }
      };

    default:
      return state;
  }
}