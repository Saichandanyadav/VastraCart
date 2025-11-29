import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getProductById } from '../services/productService';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Loader2, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMsg, setCartMsg] = useState(null);
  const { addItem } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProductById(id);
      setProduct(res.data);
      if (res.data.sizes?.length) setSize(res.data.sizes[0]);
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!size) {
      setCartMsg('Please select a size.');
      return;
    }
    addItem({ productId: product._id, size, quantity: Number(quantity), product });
    setCartMsg('Item added to cart!');
    setTimeout(() => setCartMsg(null), 2000);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-600 text-xl">{error}</div>;

  if (!product) return null;

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-10 py-10">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-3 rounded-full bg-white shadow-lg border hover:bg-gray-100 transition"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">

        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-xl object-cover"
          />
        </div>

        <div className="w-full sticky top-20 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg">{product.description}</p>

          <div className="text-4xl sm:text-5xl font-bold text-indigo-600">
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Size</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setCartMsg(null);
                    }}
                    className={`border rounded-lg py-2 text-center text-sm font-medium transition ${
                      size === s
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-gray-300 hover:border-indigo-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 border rounded-lg"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-center border py-3 rounded-lg"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 border rounded-lg"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!size}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold transition shadow-lg disabled:opacity-50"
          >
            <ShoppingCart size={22} />
            {user ? 'Add to Cart' : 'Login to Add to Cart'}
          </button>

          {cartMsg && (
            <div className="p-3 text-center bg-green-100 text-green-700 rounded-xl">
              {cartMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
