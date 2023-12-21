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
        case 'SET_MESSAGE':
          return { ...state, message: action.payload };
        case 'SET_IMAGE':
          return { ...state, image: action.payload };
        case 'SET_EMOJI':
          return { ...state, emoji: action.payload };
        case 'CLEAR_MESSAGE_DATA':
          return { message: '', image: null, emoji: '' };
        default:
          return state;
      }
};