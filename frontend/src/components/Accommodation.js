import React, { useState, useEffect } from 'react';
import QuickView from './QuickView';

export default function Accommodations({ availableAccommodations, selectedConcert, onSelectAccommodation, isCreatingPackage }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [displayedAccommodations, setDisplayedAccommodations] = useState([]);
  
  // Debugging purposes
  // console.log('Accommodations component received: ',{
  //   availableAccommodationsLength: availableAccommodations ? availableAccommodations.length : 'undefined',
  //   isArray: Array.isArray(availableAccommodations),
  //   selectedConcert: selectedConcert ? selectedConcert.id : 'none',
  //   isCreatingPackage
  // });

  // Determine which accommodations to display
  useEffect(() => {
    if (isCreatingPackage && Array.isArray(availableAccommodations)) {
      // console.log('Using availableAccommodations for package creation: ', availableAccommodations);
      setDisplayedAccommodations(availableAccommodations);
    } else {
      console.log('No valid accommodations available');
      setDisplayedAccommodations([]);
    }
  }, [availableAccommodations, isCreatingPackage]);
      
  const handleQuickView = (product) => {
    console.log('QuickView clicked for product:', product);
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };
  
  const closeModal = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };
  
  if ((!isCreatingPackage) || (isCreatingPackage && availableAccommodations === null)) return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-fuchsia-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
  
  if (displayedAccommodations.length === 0) return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {isCreatingPackage
            ? "No accommodations available for this concert date"
            : "No accommodations found"}
        </h3>
        <p className="text-gray-600">
          {isCreatingPackage
            ? "Please select a different concert or try again later."
            : "Please check back later for available accommodations."}
        </p>
        {isCreatingPackage && (
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-800 transition"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="bg-white">
      {/* Show package creation message if applicable */}
      {isCreatingPackage && (
        <div className="mb-6 p-4 bg-fuchsia-100 rounded-lg border border-fuchsia-200">
          <h3 className="text-lg font-semibold text-fuchsia-600">Select Accommodation for Your Package</h3>
          <p className="text-fuchsia-600">
            You're creating a package for <strong>{selectedConcert.title}</strong> on {new Date(selectedConcert.date).toLocaleDateString()}.
          </p>
          <p className='text-gray-600'>
            Please select an accommodation below.
          </p>
        </div>
      )}
      
      <div className="mt-6 py-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {displayedAccommodations.map((product) => (
          <div key={product.id} className="group relative">
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="aspect-square w-full rounded-md bg-fuchsia-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
              <div>
                <a href={product.href || "#"}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    handleQuickView(product); // Open QuickView
                  }}
                  className="cursor-pointer"
                >
                  <span aria-hidden="true" className="absolute text-red-600 inset-0" />
                  {product.address}
                </a>
                <p className="mt-1 text-sm text-gray-500">{product.location}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">€{product.price || "Price not available"}</p>
            </div>
            <button
              onClick={() => handleQuickView(product)}
              className={`mt-2 w-full bg-fuchsia-600 hover:bg-fuchsia-800 text-white p-2 rounded-md transition`}
            >
              {isCreatingPackage ? 'Select for Package' : 'Quick View'}
            </button>
          </div>
        ))}
      </div>
      
      {isQuickViewOpen && selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          onClose={closeModal} 
          isCreatingPackage={isCreatingPackage}
          selectedConcert={selectedConcert}
        />
      )}
    </div>
  );
}