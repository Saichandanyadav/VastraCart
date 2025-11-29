import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Loader2 } from 'lucide-react';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty. Cannot checkout.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post('/orders/checkout');
      clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/orders'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-8 text-center bg-green-50 border border-green-200 rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Order Placed Successfully! 🎉</h2>
        <p className="text-gray-600">You will be redirected to your orders page shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>

      {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Items in Order</h3>

        <ul className="space-y-3 border-b pb-4 mb-4">
          {cart.map(item => (
            <li key={`${item.product._id}-${item.size}`} className="flex justify-between items-center text-gray-700">
              <span className="truncate pr-2">{item.product.name} (Size: {item.size})</span>
              <span>{item.quantity} x ₹{item.product.price}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between text-2xl font-extrabold text-gray-900 mb-6">
          <span>Order Total:</span>
          <span className="text-indigo-600">₹{total.toLocaleString('en-IN')}</span>
        </div>

        {user ? (
          <button
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
            className={`w-full flex justify-center items-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white ${
              loading || cart.length === 0
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : 'Place Order'}
          </button>
        ) : (
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Please <Link to="/login" className="font-bold underline">Login</Link> to complete your order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
