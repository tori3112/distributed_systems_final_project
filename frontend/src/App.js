import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Concerts from './components/Concerts';
import Packages from './components/Packages';
import TubbyUs from './components/Tubby';
import Login from './components/Login';
import AuthButtons from './components/LoginButtons';
import Profile from './components/Profile';

const navigation = [
  { name: 'Concerts', href: '/concerts' },
  { name: 'Packages', href: '/packages' },
  { name: 'Destinations', href: '/' },
  { name: 'Tubby Us', href: '/tubby' },
];

export default function App() {
  return (
    <Router>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">TubbyPackages</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=fuchsia&shade=600"
                  className="h-8 w-auto"
                />
              </a>
            </div>
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
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/tubby" element={<TubbyUs />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes here as needed */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}