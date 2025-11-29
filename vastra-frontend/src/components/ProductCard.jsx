import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-200 relative">
      <div className="relative w-full h-72 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>

        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow">
          New Arrival
        </div>

        <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            to={`/product/${product._id}`}
            className="block bg-black/70 backdrop-blur-lg text-white text-center py-3 text-sm font-semibold hover:bg-black/80"
          >
            View Product
          </Link>
        </div>
      </div>

      <div className="p-4 pb-16 lg:pb-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between lg:justify-between">
          <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="hidden lg:block px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
          >
            Buy Now
          </Link>
        </div>
      </div>

      <Link
        to={`/product/${product._id}`}
        className="lg:hidden absolute bottom-0 left-0 w-full bg-indigo-600 text-white text-center py-3 font-semibold text-sm hover:bg-indigo-700 transition-all"
      >
        Buy Now
      </Link>
    </div>
  );
}
