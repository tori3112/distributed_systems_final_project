import React from 'react';
import { useAllProducts } from '../api/useApi';

function PredefinedPackages() {
  const { products, loading, error } = useAllProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) return <div>No packages available</div>;
  
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Available Packages</h5>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Package Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Concert
                </th>
                <th scope="col" class="px-6 py-3">
                    Accommodation
                </th>
                <th scope="col" class="px-6 py-3">
                    Availability
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Reserve
                </th>
            </tr>
          </thead>
          <tbody>
            {products.map(pkg => (
              <tr class="bg-white border-b border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {pkg.name}
                </th>
                <td class="px-6 py-4">
                    {pkg.artistId}
                </td>
                <td class="px-6 py-4">
                    {pkg.accomodId}
                </td>
                <td class="px-6 py-4">
                    {pkg.stock}
                </td>
                <td class="px-6 py-4">
                    €{pkg.price}
                </td>
                <td className="px-6 py-4">
                  <button className="mt-2 w-fit bg-fuchsia-600 text-white p-2 rounded-md hover:bg-fuchsia-800 transition">Get Package</button>
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