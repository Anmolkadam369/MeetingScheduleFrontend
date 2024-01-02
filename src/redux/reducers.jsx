
const initialState = {
  userData: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
