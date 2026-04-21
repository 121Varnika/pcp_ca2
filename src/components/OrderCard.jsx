import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const OrderCard = ({ order }) => {
  const { markDelivered } = useApp();

  return (
    <div
      data-testid="order-item"
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3>
        <Link to={`/orders/${order.orderId}`}>
          Order ID: {order.orderId}
        </Link>
      </h3>

      <p>
        Customer:
        {order.customerName?.trim()
          ? order.customerName
          : "Unknown"}
      </p>

      <p>Restaurant: {order.restaurant}</p>
      <p>Total: ₹{order.totalAmount}</p>
      <p>Status: {order.status}</p>

      {order.rating && <p>Rating: {order.rating}</p>}

      {order.status === "Pending" && (
        <button
          onClick={() =>
            markDelivered(order.orderId)
          }
        >
          Mark Delivered
        </button>
      )}
    </div>
  );
};

export default OrderCard;