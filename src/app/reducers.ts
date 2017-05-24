import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { fetchArticleListReducer } from "./blog-app/article-list/article-list.reducers";
import { blogAsideReducer } from './blog-app/blog-aside/blog-aside.reducers';

export const syncReducers = {
  router: routerReducer,
  articleList: fetchArticleListReducer,
  blogAside: blogAsideReducer
};

const deepCombineReducers = (allReducers: any) => {
  Object.getOwnPropertyNames(allReducers).forEach((prop) => {
    if (allReducers.hasOwnProperty(prop)
      && allReducers[prop] !== null
      && typeof allReducers[prop] !== 'function') {
      allReducers[prop] = deepCombineReducers(allReducers[prop]);
    }
  });
  return combineReducers(allReducers);
};

const createReducer = (asyncReducers = {}) => {
  let allReducers = { ...syncReducers, ...asyncReducers };
  return deepCombineReducers(allReducers);
};

export function rootReducer(state: any, action: any, asyncReducer) {
  return createReducer(asyncReducer)(state, action);
}

export function createNewRootReducer(reducer: any): ActionReducer<any> {
  return function (state, action) {
    return rootReducer(state, action, reducer);
  };
}
