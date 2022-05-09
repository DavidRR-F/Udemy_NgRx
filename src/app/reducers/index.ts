import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  import {routerReducer} from '@ngrx/router-store';
  
  export interface AppState {
  
  }
  
  export const reducers: ActionReducerMap<AppState> = {
      router: routerReducer
  };
  

  // metaReducer function
  export function logger(reducer:ActionReducer<any>)
      : ActionReducer<any> {
      return (state, action) => {
          console.log("state before: ", state);
          console.log("action", action);
  
          return reducer(state, action);
      }
  
  }
  // metaReducer array
  export const metaReducers: MetaReducer<AppState>[] =
      !environment.production ? [logger] : [];