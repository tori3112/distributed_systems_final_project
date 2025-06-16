import React from "react";
import { useCart } from '../context/CartContext';
import  { v4 as uuidv4 } from 'uuid';

function generateId() {
    const uuid = uuidv4();
    const uuidInteger = parseInt(uuid.replace(/-/g, '').substring(0, 8), 16) % 1000000000;
    return uuidInteger;
}

export default function QuickView({ 
  product, 
  onClose,
  ticketQuantity,
  isCreatingPackage,
  selectedConcert
}) {

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedConcert || !product) {
      console.error('Cannot create a package: No concert or no accommodation');
      return;
    }

    console.log("concert: ", selectedConcert);
    console.log("accom: ", product);

    // Create a package
    const newPackage = {
      package_id: generateId(),
      accom_id: product.id,
      accom_address: product.address,
      ticket_id: selectedConcert.id,
      ticket: selectedConcert.title,
      ticket_quantity: ticketQuantity,
      price: (selectedConcert.price || 0) + (product.price || 0),
      
      name: `Custom Package (${product.location}, ${selectedConcert.date})`,
    };
      
    console.log("Creating package:", newPackage);

    addToCart(newPackage);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-900">{product.address}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <div className="mt-4">
          <img 
            src={product.imageSrc} 
            alt={product.imageAlt} 
            className="w-full h-64 object-cover rounded-md"
          />
          
          <div className="mt-4 gap-4">
              <h4 className="font-semibold text-gray-800">Location</h4>
              <p>{product.location || "Location not specified"}</p>
              
              <h4 className="font-semibold text-gray-800 mt-3">Address</h4>
              <p>{product.address || "Address not available"}</p>
              
              {product.dateIn && product.dateOut && (
                <>
                  <h4 className="font-semibold text-gray-800 mt-3">Available Dates</h4>
                  <p>{new Date(product.dateIn).toLocaleDateString()} - {new Date(product.dateOut).toLocaleDateString()}</p>
                </>
              )}

              <h4 className="font-semibold text-gray-800 mt-3">Price</h4>
              <p>€{product.price || "Price not available"}</p>
              
            
            {/* <div>
              <h4 className="font-semibold text-gray-800">Price</h4>
              <p className="text-xl font-bold text-gray-900">€{product.price || "Price not available"}</p>
              
              {isCreatingPackage && selectedConcert && (
                <>
                  <div className="mt-3 p-3 bg-fuchsia-50 rounded-md">
                    <h4 className="font-semibold text-fuchsia-800">Package Details</h4>
                    <p>Concert: {selectedConcert.title}</p>
                    <p>Date: {new Date(selectedConcert.date).toLocaleDateString()}</p>
                    <p>Concert Price: €{selectedConcert.price || 0}</p>
                    <p>Accommodation: {product.address}</p>
                    <p>Accommodation Price: €{product.price || 0}</p>
                    <p className="font-bold mt-2">Total Package Price: €{(selectedConcert.price || 0) + (product.price || 0)}</p>
                  </div>
                </>
              )}
            </div> */}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400"
            >
              Close
            </button>
            
            <button
              onClick={() => handleAddToCart()}
              className="px-4 py-2 bg-fuchsia-600 text-white text-sm font-medium rounded-md hover:bg-fuchsia-700"
            >
              Add Package to Cart
            </button>  
          </div>
        </div>
      </div>
    </div>
  );
}