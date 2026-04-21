import { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducer/AppReducer";
import { getToken, getDataset } from "../services/api";

const AppContext = createContext();

const initialState = {
  orders: [],
  loading: true,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const tokenRes = await getToken(
          "E0323009",
          "878827",
          "setA"
        );

        const data = await getDataset(
          tokenRes.token,
          tokenRes.dataUrl
        );

        dispatch({
          type: "SET_ORDERS",
          payload: data.orders,
        });

      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchOrders();
  }, []);

  const markDelivered = (id) => {
    dispatch({
      type: "MARK_DELIVERED",
      payload: id,
    });
  };

  return (
    <AppContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        markDelivered,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);