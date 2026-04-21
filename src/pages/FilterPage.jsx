import { useState } from "react";
import { useApp } from "../context/AppContext";
import OrderCard from "../components/OrderCard";

const FilterPage = () => {
  const { orders, loading } = useApp();

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

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

  const handleFilter = () => {
    const value = search.trim();

    if (value === "") {
      setError("Please enter restaurant name");
      setResults([]);
      return;
    }

    setError("");

    const filtered = validOrders.filter((order) =>
      order.restaurant?.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div>
      <h1>Filter Orders</h1>

      <input
        type="text"
        placeholder="Enter restaurant name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleFilter}>Search</button>

      {error && <p>{error}</p>}

      {!error && search && results.length === 0 && (
        <p>No Results Found</p>
      )}

      {results.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default FilterPage;