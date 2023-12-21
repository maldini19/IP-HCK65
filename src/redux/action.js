export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const clearUser = () => ({
  type: "CLEAR_USER",
});

export const setMessage = (message) => ({
  type: "SET_MESSAGE",
  payload: message,
});

export const setImage = (image) => ({
  type: "SET_IMAGE",
  payload: image,
});

export const setEmoji = (emoji) => ({
    type: 'SET_EMOJI',
    payload: emoji,
  });

export const clearMessageData = () => ({
  type: "CLEAR_MESSAGE_DATA",
});
