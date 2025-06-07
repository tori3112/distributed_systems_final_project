import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  { name: 'Predefined Packages', href: '/predefinedpackages'},
  { name: 'Cart', href: '/cart'},
  { name: 'Tubby Us', href: '/tubby' }
];

const TubbyLogo = () => {
  return (
    <div className="flex lg:flex-1">
      <Link to='/' className='-m-1.5 p-1.5'>
        <span className="sr-only">TubbyPackages</span>
        <Logo className="h-8 w-auto fill-fuchsia-700" />
      </Link>
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
                  <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                    {item.name}
                  </Link>
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
            <Route path="/predefinedpackages" element={<PredefinedPackages />} />
            <Route path="/cart" element={<CartDisplay />} />
            <Route path="/tubby" element={<TubbyUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}