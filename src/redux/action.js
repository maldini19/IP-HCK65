export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const clearUser = () => ({
  type: "CLEAR_USER",
});

export const addMessage = message => ({
    type: 'ADD_MESSAGE',
    payload: message,
  });
  
  export const deleteMessage = id => ({
    type: 'DELETE_MESSAGE',
    payload: id,
  });

export const clearMessageData = () => ({
  type: "CLEAR_MESSAGE_DATA",
});
