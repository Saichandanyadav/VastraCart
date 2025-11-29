import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, User, Mail } from 'lucide-react';

export default function Account() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center space-x-3">
        <Package className="w-8 h-8 text-indigo-600" />
        <span>My Account</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
            <User className="w-5 h-5 text-indigo-600" />
            <span>Name</span>
          </h3>
          <p className="text-gray-900 text-lg">{user.name}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
            <Mail className="w-5 h-5 text-indigo-600" />
            <span>Email</span>
          </h3>
          <p className="text-gray-900 text-lg">{user.email}</p>
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center justify-center space-x-3 w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          <Package className="w-5 h-5" />
          <span>My Orders</span>
        </button>
      </div>
    </div>
  );
}
