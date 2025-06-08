import React from 'react';
import { useCart } from '../context/CartContext';

function CartDisplay() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-white">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  console.log("cart items: ", cartItems);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-white">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="py-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p>Concert: {item.ticket}</p>
              <p>Accommodation: {item.accommodation}</p>
              <p className="font-bold">€{item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg font-bold">€{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700 transition"
          >
            Clear Cart
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDisplay;