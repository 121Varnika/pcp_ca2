import { useEffect } from "react";
import { useApp } from "../context/AppContext";

const Stats = () => {
  const { orders, loading } = useApp();

  const validStatus = ["Delivered", "Pending", "Cancelled"];

  const validOrders = orders.filter((order) => {
    return (
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.totalAmount > 0 &&
      order.items.every((item) => item.quantity > 0) &&
      validStatus.includes(order.status)
    );
  });

  const stats = validOrders.reduce(
    (acc, order) => {
      acc.totalOrders++;

      if (order.status === "Delivered") acc.deliveredOrders++;
      if (order.status === "Cancelled") acc.cancelledOrders++;

      return acc;
    },
    {
      totalOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    }
  );

  useEffect(() => {
    window.appState = {
      totalOrders: stats.totalOrders,
      deliveredOrders: stats.deliveredOrders,
      cancelledOrders: stats.cancelledOrders,
    };
  }, [stats]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Stats</h1>

      <div data-testid="total-orders">
        {stats.totalOrders}
      </div>

      <div data-testid="delivered-orders">
        {stats.deliveredOrders}
      </div>

      <div data-testid="cancelled-orders">
        {stats.cancelledOrders}
      </div>
    </div>
  );
};

export default Stats;