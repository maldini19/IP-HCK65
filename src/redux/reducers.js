export const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'CLEAR_USER':
            return null;
        default:
            return state;
    }
};

export const messageDataReducer = (state = { message: '', image: null }, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
          return [...state, action.payload];
        case 'DELETE_MESSAGE':
          return state.filter(message => message.id !== action.payload);
        default:
          return state;
      }
};