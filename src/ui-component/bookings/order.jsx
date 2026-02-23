













import React, { useEffect, useState } from "react";
import "./Order.css";
import { useDispatch, useSelector } from "react-redux";
import { getVendorOrdersRequest } from "../../container/orderContainer/slice";

const Order = () => {
  const dispatch = useDispatch();

  const { orders = [], loading, error } = useSelector(
    (state) => state.order || {}
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Fetch Orders from saga
  useEffect(() => {
    dispatch(getVendorOrdersRequest());
  }, [dispatch]);

  // ✅ Filter Orders by search + status
  const filteredOrders = orders.filter((order) => {
    const customerName = order.userId?.name || "";

    const matchesSearch = customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status
      ? order.paymentStatus === status
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="order-container">
      {/* Header */}
      <div className="order-header">
        <h2>Orders</h2>
        <p>Manage and track customer bookings</p>
      </div>

      {/* Controls */}
      <div className="order-controls">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <input
          type="text"
          placeholder="Search by customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="order-table">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading orders...</p>
        ) : error ? (
          <p style={{ padding: "20px", color: "red" }}>
            Failed to load orders
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.userId?.name}</td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td>{order.eventId?.title}</td>

                    <td>₹ {order.totalAmount}</td>

                    <td>
                      <span className={`status ${order.paymentStatus}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};


export default Order;