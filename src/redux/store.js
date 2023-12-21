import { createStore, combineReducers } from 'redux';
import { userReducer, messageDataReducer } from './reducers';

const rootReducer = combineReducers({
  user: userReducer,
  messageData: messageDataReducer,
});

const store = createStore(rootReducer);

export default store;