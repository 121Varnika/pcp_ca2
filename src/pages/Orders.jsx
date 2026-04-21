import { useApp } from "../context/AppContext";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const { orders, loading } = useApp();

  if (loading) return <h2>Loading...</h2>;

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

  return (
    <div>
      <h1>Valid Orders</h1>

      {validOrders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default Orders;