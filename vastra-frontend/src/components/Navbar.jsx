import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Package, LogIn, UserPlus } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    setModalOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center font-bold text-gray-900 tracking-wider overflow-hidden">
              <img
                src="/logo2.png"
                alt="VastraCart Logo"
                className="rounded-full h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 object-cover mr-2"
              />
              <span className="text-indigo-600 text-base sm:text-lg md:text-xl lg:text-2xl truncate">Vastra</span>Cart
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/cart" className="text-gray-600 hover:text-indigo-600 p-2 rounded-md transition relative">
                <ShoppingCart size={20} />
              </Link>

              {user ? (
                <>
                  <Link
                    to="/orders"
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-md transition flex items-center space-x-1"
                  >
                    <Package size={20} />
                    <span className="hidden lg:inline">Orders</span>
                  </Link>

                  <Link
                    to="/account"
                    className="text-gray-600 hover:text-indigo-600 p-2 rounded-md transition flex items-center"
                  >
                    <User size={20} className="mr-0 lg:mr-1" />
                    <span className="hidden lg:inline">{user.name}</span>
                  </Link>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center text-red-600 hover:text-red-700 font-medium py-1 px-2 lg:px-3 rounded-md transition"
                  >
                    <LogOut size={18} className="mr-0 lg:mr-1" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex sm:hidden items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                  >
                    <LogIn size={20} />
                  </Link>

                  <Link
                    to="/register"
                    className="flex sm:hidden items-center justify-center w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
                  >
                    <UserPlus size={20} />
                  </Link>

                  <Link
                    to="/login"
                    className="hidden sm:flex items-center px-3 py-1 font-medium text-gray-600 hover:text-indigo-600 rounded-md transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="hidden sm:flex items-center px-3 py-1 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ConfirmModal
        open={modalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        onCancel={() => setModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}
