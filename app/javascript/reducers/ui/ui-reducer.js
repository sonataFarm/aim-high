import { combineReducers } from 'redux';

import errors from './errors-reducer';
import loading from './loading-reducer';

export default combineReducers({ errors, loading });