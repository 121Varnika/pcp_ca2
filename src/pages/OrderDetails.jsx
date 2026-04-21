import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders, loading } = useApp();

  if (loading) return <h2>Loading...</h2>;

  const order = orders.find(
    (item) => item.orderId === Number(id)
  );

  if (!order) {
    return <h2>Order Not Found</h2>;
  }

  const customer =
    order.customerName?.trim()
      ? order.customerName
      : "Unknown";

  return (
    <div>
      <h1>Order Details</h1>

      <h2>Order ID: {order.orderId}</h2>
      <p>Customer: {customer}</p>
      <p>Restaurant: {order.restaurant || "Unknown"}</p>
      <p>Status: {order.status || "Unknown"}</p>
      <p>Total Amount: ₹{order.totalAmount || 0}</p>

      {order.deliveryTime && (
        <p>Delivery Time: {order.deliveryTime} mins</p>
      )}

      {order.rating && (
        <p>Rating: {order.rating}</p>
      )}

      <h3>Items</h3>

      {order.items && order.items.length > 0 ? (
        order.items.map((item, index) => {
          const subtotal =
            item.price * item.quantity;

          return (
            <div key={index}>
              <p>Name: {item.name}</p>
              <p>Price: ₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <p>Subtotal: ₹{subtotal}</p>
              <hr />
            </div>
          );
        })
      ) : (
        <p>No Items</p>
      )}
    </div>
  );
};

export default OrderDetails;