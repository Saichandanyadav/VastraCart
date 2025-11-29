import { useEffect, useState, useContext } from 'react'; 
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Loader2, Search, SlidersHorizontal, X, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: '', size: '', page: 1, limit: 12 });
  const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });
  const [showFilters, setShowFilters] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await getProducts(`?${query}`);
      setData(res.data.products);
      setPagination({ totalPages: res.data.totalPages, page: res.data.page });
    } catch {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const updateFilter = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const changePage = (p) => {
    if (p >= 1 && p <= pagination.totalPages) {
      setFilters(prev => ({ ...prev, page: p }));
    }
  };

  const resetFilters = () => {
    setFilters({ search: '', category: '', size: '', page: 1, limit: 12 });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
        {user ? (
          <>Hey, <span className="text-indigo-600">{user.name}</span>. Explore your latest picks.</>
        ) : (
          <>Discover Fashion. Shop Smarter.</>
        )}
      </div>

      <div className="flex items-center gap-3 bg-white/60 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm p-3">
        <Search className="w-5 h-5 text-indigo-600" />
        <input
          type="text"
          placeholder="Search for shirts, jeans, hoodies..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="flex-grow outline-none bg-transparent text-gray-800"
        />
        <button
          onClick={() => setShowFilters(true)}
          className="p-2 bg-indigo-600 text-white rounded-lg sm:hidden"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="hidden sm:flex gap-3 mt-4">
        {['Men', 'Women', 'Kids'].map(c => (
          <button
            key={c}
            onClick={() => updateFilter('category', c)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              filters.category === c
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 hover:border-indigo-600'
            }`}
          >
            {c}
          </button>
        ))}

        <button
          onClick={resetFilters}
          className="text-sm px-4 py-2 border rounded-full text-gray-600 hover:text-red-600 hover:border-red-500"
        >
          Reset
        </button>
      </div>

      {showFilters && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50 sm:hidden">
          <div className="w-72 h-full bg-white p-5 shadow-xl flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Filters</h3>
              <X className="cursor-pointer" onClick={() => setShowFilters(false)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Category</label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="border p-2 rounded-lg"
              >
                <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Size</label>
              <select
                value={filters.size}
                onChange={(e) => updateFilter('size', e.target.value)}
                className="border p-2 rounded-lg"
              >
                <option value="">All</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <button
              onClick={() => {
                resetFilters();
                setShowFilters(false);
              }}
              className="mt-auto bg-red-500 text-white py-3 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
        </div>
      ) : data.length ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {data.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 mt-10 select-none">
            <button
              disabled={pagination.page === 1}
              onClick={() => changePage(pagination.page - 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              {pagination.page} / {pagination.totalPages}
            </span>

            <button
              disabled={pagination.page === pagination.totalPages}
              onClick={() => changePage(pagination.page + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 flex flex-col items-center bg-white rounded-xl shadow-lg mt-6">
          <Package className="text-indigo-600 w-14 h-14" />
          <h3 className="text-xl font-semibold mt-4">No Products Found</h3>
          <p className="text-gray-600 text-sm">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}
