import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import search from './search-reducer';

export default combineReducers({
  router,
  search,
});
