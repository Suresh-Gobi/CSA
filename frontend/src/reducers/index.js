
// Initial state
const initialState = {
    user: null,
  };
  
  // A simple reducer (you can split into multiple reducers later)
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  