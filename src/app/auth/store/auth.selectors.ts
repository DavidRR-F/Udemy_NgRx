import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";


// feature selector (allows for autocompletion)
// same as state => state['auth'],
export const selectAuthState = createFeatureSelector<AuthState>('auth');


// memoized function
// meaning keeps prev statw until update
export const isLoggedIn = createSelector(
    selectAuthState,
    auth => !!auth.user
);

// can combine selectors
// export const LoggedOut = createSelector(
//     isLoggedIn,
//     loggedIn => !loggedIn
// );

