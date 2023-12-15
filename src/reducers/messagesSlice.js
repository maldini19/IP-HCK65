import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    deleteMessage: (state, action) => {
      return state.filter(message => message.id !== action.payload);
    },
    editMessage: (state, action) => {
      return state.map(message =>
        message.id === action.payload.messageId
          ? { ...message, text: action.payload.newText, edited: true }
          : message
      );
    },
  },
});

export const { addMessage, deleteMessage, editMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
