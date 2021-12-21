
import { ROUTE } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";

export default function RoutesReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

    case ROUTE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        routes: {
          ...state.routes,
          routesFetchStatus: action.payload
        }
      };
    
    case ROUTE.LIST_FETCHED :
      let status = fetchUpdater(
        state.routes.routesPage, 
        action.payload.routesNumberOfPages, 
        state.routes.routes.length, 
        action.payload.routes.length
      );
      
      const rev = state.routes.routes.filter(i=> i !== null);

      return {
        ...state,
        routes: {
          routesFetchStatus: status,
          routesPage: state.routes.routesPage+1,
          routesNumberOfPages: action.payload.routesNumberOfPages,
          routes: [...action.payload.routes, ...rev, null],
        }
      };

    default:
      return state;
  }
}

