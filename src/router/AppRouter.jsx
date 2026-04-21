import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import FilterPage from "../pages/FilterPage";
import Stats from "../pages/Stats";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;