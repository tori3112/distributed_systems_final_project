import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Packages from './components/Packages';
import TubbyUs from './components/Tubby';
import Login from './components/Login';
import AuthButtons from './components/LoginButtons';
import Profile from './components/Profile';

import {ReactComponent as Logo} from './logo.svg';
import PredefinedPackages from './components/PredefinedPackages';

import { CartProvider } from './context/CartContext';
import CartDisplay from './components/CartDisplay';

const navigation = [
  { name: 'Packages', href: '/packages' },
  { name: 'Tubby Us', href: '/tubby' },
  { name: 'PredefinedPackages', href: '/predefinedpackages'},
  { name: 'Cart', href: '/cart'}
];

const TubbyLogo = () => {
  return (
    <div className="flex lg:flex-1">
      <a href='/' className='-m-1.5 p-1.5'>
        <span className="sr-only">TubbyPackages</span>
        <Logo className="h-8 w-auto fill-fuchsia-700" />
      </a>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
        <Router>
          <div className="bg-white">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
              <TubbyLogo />
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <AuthButtons />
              </div>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/tubby" element={<TubbyUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/predefinedpackages" element={<PredefinedPackages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartDisplay />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}