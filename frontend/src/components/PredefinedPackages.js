import React from 'react';
import axios from 'axios';
import { useAllProducts } from '../api/hooks/usePackages';
import { useCart } from '../context/CartContext';
// import  { v4 as uuidv4 } from 'uuid';

// function generateId() {
//     const uuid = uuidv4();
//     const uuidInteger = parseInt(uuid.replace(/-/g, '').substring(0, 8), 16) % 1000000000;
//     return uuidInteger;
// }

function PredefinedPackages() {
  const { data: products, loading, error } = useAllProducts();
  const { cartItems, addToCart } = useCart(); 

  console.log("Packages: ", products);
  
  if (loading) return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-fuchsia-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  );

  if (error) return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div>Error: {error.message}</div>
    </div>
  );

  if (!products || products.length === 0) return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div>No packages available</div>
    </div>
  ); 
  
  // Function to check if a package is in the cart
  const isInCart = (pkgId) => {
    return cartItems.some(item => item.id === pkgId);
  };
  
  // Function to handle adding to cart
  const handleAddToCart = async (pkg) => {
    let ticket_title = "No ticket name available";
    let accom_address = "No accommodation address available";

    const ticketUrl = pkg._links["/tickets"]?.href;
    console.log('Checking ticket url: ', ticketUrl);
    if (ticketUrl) {
      try {
        const ticketResponse = await axios.get(ticketUrl);
        console.log('Ticket Response: ', ticketResponse)
        ticket_title = ticketResponse.data.title;
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    }

    const accomUrl = pkg._links["/accoms"]?.href;
    console.log('Checking ticket url: ', ticketUrl);
    if (accomUrl) {
      try {
        const accommodationResponse = await axios.get(accomUrl);
        console.log('Accommodation Response: ', accommodationResponse)
        accom_address = accommodationResponse.data.address;
      } catch (error) {
        console.error('Error fetching accommodation details:', error);
      }
    }

    const predefinedPkg = {
      package_id: pkg.id,
      accom_id: pkg.accommodation,
      accom_address: accom_address,
      ticket_id: pkg.ticket,
      ticket: ticket_title,
      ticket_quantity: 1,
      price: pkg.price
    }

    console.log('Added to cart: ', predefinedPkg);
    addToCart(predefinedPkg);
  };
  
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Available Packages</h5>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs font-bold text-gray-700 uppercase bg-gray-50">
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
                  {pkg.ticket}
                </td>
                <td className="px-6 py-4">
                  {pkg.accommodation}
                </td>
                <td className="px-6 py-4">
                  {pkg.availability}
                </td>
                <td className="px-6 py-4">
                  €{pkg.price}
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`mt-2 w-fit p-2 rounded-md transition ${
                      pkg.availability <= 0 || isInCart(pkg.id)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-fuchsia-600 hover:bg-fuchsia-800 text-white'
                    }`}
                    disabled={pkg.availability <= 0 || isInCart(pkg.id)}
                    onClick={() => handleAddToCart(pkg)}
                  >
                    {pkg.availability <= 0
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