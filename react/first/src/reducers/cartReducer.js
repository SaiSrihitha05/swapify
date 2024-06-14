const initialState = {
    items: [],
    totalItems: 0,
    totalAmount: 0
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  