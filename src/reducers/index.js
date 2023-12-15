import { combineReducers } from 'redux';
import { ADD_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE } from '../actions';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    case DELETE_MESSAGE:
      return state.filter(message => message.id !== action.payload);
    case EDIT_MESSAGE:
      return state.map(message =>
        message.id === action.payload.messageId
          ? { ...message, text: action.payload.newText, edited: true }
          : message
      );
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages: messagesReducer,
});

export default rootReducer;
