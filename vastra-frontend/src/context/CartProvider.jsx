import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { addToCart, getCart, updateCart, removeItem } from '../services/cartService';
import { CartContext } from './CartContext'; 

export default function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (user) {
        const res = await getCart();
        setCart(res.data);
        localStorage.removeItem('guest_cart');
      } else {
        const guest = JSON.parse(localStorage.getItem('guest_cart')) || [];
        setCart(guest);
      }
    } catch {
      setError('Failed to load cart');
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [user, loadCart]);

  const addItem = async (item) => {
    setError(null);
    try {
      if (user) {
        const res = await addToCart(item);
        setCart(res.data);
      } else {
        let guest = JSON.parse(localStorage.getItem('guest_cart')) || [];
        const existing = guest.find(i => i.product?._id === item.productId && i.size === item.size);
        if (existing) {
          existing.quantity += Number(item.quantity);
        } else {
          guest.push({ product: item.product, size: item.size, quantity: Number(item.quantity) });
        }
        localStorage.setItem('guest_cart', JSON.stringify(guest));
        setCart([...guest]);
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Error adding item to cart');
    }
  };

  const updateItemQuantity = async (productId, size, quantity) => {
    setError(null);
    try {
      if (user) {
        const res = await updateCart({ productId, size, quantity });
        setCart(res.data);
      } else {
        let guest = JSON.parse(localStorage.getItem('guest_cart')) || [];
        const itemIndex = guest.findIndex(i => i.product?._id === productId && i.size === size);
        if (quantity <= 0) {
          guest.splice(itemIndex, 1);
        } else if (itemIndex > -1) {
          guest[itemIndex].quantity = quantity;
        }
        localStorage.setItem('guest_cart', JSON.stringify(guest));
        setCart([...guest]);
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Error updating item quantity');
    }
  };

  const removeItemFromCart = async (productId, size) => {
    setError(null);
    try {
      if (user) {
        const res = await removeItem({ productId, size });
        setCart(res.data);
      } else {
        let guest = JSON.parse(localStorage.getItem('guest_cart')) || [];
        guest = guest.filter(i => !(i.product?._id === productId && i.size === size));
        localStorage.setItem('guest_cart', JSON.stringify(guest));
        setCart(guest);
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Error removing item from cart');
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('guest_cart');
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItemQuantity, removeItemFromCart, clearCart, loading, error, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}
