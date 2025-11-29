import { useEffect, useState } from "react";
import api from "../services/api";
import { Loader2, Package, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-xl shadow-md">
          <Package className="w-14 h-14 mx-auto text-gray-400" />
          <p className="mt-4 text-lg text-gray-600">No orders found</p>
          <Link
            to="/"
            className="mt-6 inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b">
                <div>
                  <p className="text-gray-700 text-sm tracking-wide">
                    ORDER ID
                  </p>
                  <p className="text-xl font-bold text-gray-900 break-all">
                    #{o._id}
                  </p>
                  <div className="flex items-center mt-1 text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(o.orderDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-2xl font-extrabold text-indigo-600">
                  ₹{o.totalPrice.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto flex gap-4 pb-3">
                {o.items.map((i, idx) => (
                  <div
                    key={idx}
                    className="min-w-[230px] bg-gray-50 rounded-xl p-4 border"
                  >
                    <p className="font-semibold text-gray-900 truncate">
                      {i.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Size: {i.size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {i.quantity}
                    </p>
                    <p className="mt-2 text-lg font-bold text-green-600">
                      ₹{i.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
