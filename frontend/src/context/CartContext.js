import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
      const existingItem = prevItems.find(cartItem => cartItem.package_id === item.package_id);
      if (existingItem) {
        return prevItems;
      } else {
        // Add quantity property to new items
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.package_id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increment = (itemId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.package_id === itemId 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      )
    );
  };

  const decrement = (itemId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.package_id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const totalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Use each item's quantity for calculation
      const quantity = item.quantity || 1;
      return total + (item.price * quantity);
    }, 0);
  };

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