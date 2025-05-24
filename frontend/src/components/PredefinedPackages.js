import React from 'react';
import { useAllProducts } from '../api/useApi';
import { useCart } from '../context/CartContext';

function PredefinedPackages() {
  const { products, loading, error } = useAllProducts();
  const { cartItems, addToCart } = useCart(); // Add this line to get cartItems and addToCart
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) return <div>No packages available</div>;
  
  // Function to check if a package is in the cart
  const isInCart = (pkgId) => {
    return cartItems.some(item => item.id === pkgId);
  };
  
  // Function to handle adding to cart
  const handleAddToCart = (pkg) => {
    addToCart(pkg);
  };
  
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Available Packages</h5>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Package Name
              </th>
              <th scope="col" className="px-6 py-3">
                Concert
              </th>
              <th scope="col" className="px-6 py-3">
                Accommodation
              </th>
              <th scope="col" className="px-6 py-3">
                Availability
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Reserve
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(pkg => (
              <tr key={pkg.id} className="bg-white border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {pkg.name}
                </th>
                <td className="px-6 py-4">
                  {pkg.artistId}
                </td>
                <td className="px-6 py-4">
                  {pkg.accomodId}
                </td>
                <td className="px-6 py-4">
                  {pkg.stock}
                </td>
                <td className="px-6 py-4">
                  €{pkg.price}
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`mt-2 w-fit p-2 rounded-md transition ${
                      pkg.stock <= 0 || isInCart(pkg.id)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-fuchsia-600 hover:bg-fuchsia-800 text-white'
                    }`}
                    disabled={pkg.stock <= 0 || isInCart(pkg.id)}
                    onClick={() => handleAddToCart(pkg)}
                  >
                    {pkg.stock <= 0
                      ? 'Out of Stock'
                      : isInCart(pkg.id)
                        ? 'In Cart'
                        : 'Get Package'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PredefinedPackages;