const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case "MARK_DELIVERED":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (
            order.orderId === action.payload &&
            order.status !== "Delivered"
          ) {
            return {
              ...order,
              status: "Delivered",
            };
          }

          return order;
        }),
      };

    default:
      return state;
  }
};

export default AppReducer;