import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartDisplay() {
  const { cartItems, removeFromCart, clearCart, totalPrice, increment, decrement } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-white">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  console.log("cart items: ", cartItems);

  const handleCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div className="relative isolate w-3/4 content-center m-auto px-6 py-24 sm:py-32 lg:px-8 bg-white">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="py-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-fuchsia-600">{item.name}</h3>
              <p>Concert: {item.ticket}</p>
              <p>Accommodation: {item.accommodation}</p>
              <p>Price: €{item.price}</p>
              <div className='flex'>
                <p>Amount: </p>
                <button onClick={() => increment(item.package_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-fuchsia-600">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => decrement(item.package_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-fuchsia-600">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.package_id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg font-bold">€{totalPrice()}</span>
        </div>
        <div className="flex justify-between">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-fuchsia-600 text-white p-2 rounded-md hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDisplay;