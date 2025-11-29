import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Trash2, Loader2, ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function Cart() {
  const { cart, updateItemQuantity, removeItemFromCart, loading, error } = useContext(CartContext);

  const [openModal, setOpenModal] = useState(false);
  const [deletePayload, setDeletePayload] = useState({ id: null, size: null });

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const askDelete = (id, size) => {
    setDeletePayload({ id, size });
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (deletePayload.id && deletePayload.size) {
      removeItemFromCart(deletePayload.id, deletePayload.size);
    }
    setOpenModal(false);
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-indigo-600" />
      </div>
    );

  const total = calculateTotal();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {cart.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <Trash2 className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-4 text-xl text-gray-500">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-2/3 space-y-2">
              {cart.map((item) => (
                <div
                  key={`${item.product?._id}-${item.size}`}
                  className="bg-white p-3 rounded-lg shadow-md flex items-center justify-between border border-gray-100 flex-wrap"
                >
                  <Link to={`/product/${item.product?._id}`} className="flex-shrink-0">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </Link>

                  <div className="flex-1 px-3 min-w-0 w-full sm:w-auto">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.product?.name}</h3>
                    <p className="text-gray-600 text-sm truncate">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-indigo-600 font-bold mt-1">
                      ₹{item.product?.price?.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 mt-2 sm:mt-0">
                    <button
                      onClick={() =>
                        item.product?._id &&
                        updateItemQuantity(item.product._id, item.size, item.quantity - 1)
                      }
                      className="p-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        item.product?._id &&
                        updateItemQuantity(
                          item.product._id,
                          item.size,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      className="w-12 text-center border border-gray-300 rounded-md py-1 text-sm"
                    />

                    <button
                      onClick={() =>
                        item.product?._id &&
                        updateItemQuantity(item.product._id, item.size, item.quantity + 1)
                      }
                      className="p-1 border rounded-md hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() =>
                        item.product?._id && askDelete(item.product._id, item.size)
                      }
                      className="p-1 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3 hidden lg:block">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 sticky top-20">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h3>
                <div className="flex justify-between text-lg font-medium text-gray-700 border-t pt-4 mt-4">
                  <span>Total:</span>
                  <span className="text-indigo-600 font-extrabold">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="mt-6 w-full flex justify-center items-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 flex justify-between items-center shadow-lg">
            <p className="text-gray-700 font-medium text-base">
              Total: <span className="text-indigo-600 font-bold">₹{total.toLocaleString('en-IN')}</span>
            </p>
            <Link
              to="/checkout"
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 flex items-center"
            >
              Checkout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </>
      )}

      <ConfirmModal
        open={openModal}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        onConfirm={confirmDelete}
        onCancel={() => setOpenModal(false)}
      />
    </div>
  );
}
