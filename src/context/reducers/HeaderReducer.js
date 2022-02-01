import { HEADER } from "../actions/headerActions";
import headerState from "../states/headerState";

export default function HeaderReducer (state, { type, payload }) {
  
  switch (type) { 
    
    case HEADER.CHANGED: 
      return {
        path: payload?.path ?? headerState.path,
        title: payload?.title ?? headerState.title,
        headerTitle: payload?.headerTitle ?? headerState.headerTitle,
        searchPage: payload?.searchPage ?? headerState.searchPage,
        topNavPaths: payload?.topNavPaths ?? headerState.topNavPaths
      };
    
    default:
      return state;
  }
}

