import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [amount, setAmount] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  
  // Load cart when component mounts or authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // Load user-specific cart from localStorage
      const userCart = localStorage.getItem(`cart_${user.sub}`);
      if (userCart) {
        setCartItems(JSON.parse(userCart));
      }
    } else {
      // Load anonymous cart
      const anonymousCart = localStorage.getItem('anonymous_cart');
      if (anonymousCart) {
        setCartItems(JSON.parse(anonymousCart));
      }
    }
  }, [isAuthenticated, user]);

  // Save cart whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart_${user.sub}`, JSON.stringify(cartItems));
    } else {
      localStorage.setItem('anonymous_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, user]);

  // Handle cart merging when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      const anonymousCart = localStorage.getItem('anonymous_cart');
      if (anonymousCart) {
        const anonymousItems = JSON.parse(anonymousCart);
        if (anonymousItems.length > 0) {
          // Merge anonymous cart with user cart
          setCartItems(prevItems => {
            const mergedCart = [...prevItems];
            anonymousItems.forEach(item => {
              if (!mergedCart.some(existingItem => existingItem.id === item.id)) {
                mergedCart.push(item);
              }
            });
            return mergedCart;
          });
          // Clear anonymous cart after merging
          localStorage.removeItem('anonymous_cart');
        }
      }
    }
  }, [isAuthenticated, user]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems;
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = () => {
    return cartItems.reduce((total, item) => {
      const quantity = amount;
      return total + (item.price * quantity);
    }, 0);
  };

  function increment() {
    setAmount(function (prevAmount) {
      return (prevAmount+=1);
    });
  }

  function decrement() {
    setAmount(function (prevAmount) {
      if (prevAmount > 1) {
        return (prevAmount-=1);
      } else {
        return (prevAmount = 1);
      }
    });
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      isUserCart: isAuthenticated,
      totalPrice,
      increment,
      decrement
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);