import React from 'react';
import { useAllProducts } from '../api/useApi';

function Cart() {
  const { products, loading, error } = useAllProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) return <div>No packages available</div>;
  
  return (
    <div className="cart">
      <h1>Available Packages</h1>
      <div className="package-list">
        {products.map(pkg => (
          <div key={pkg.id} className="package-item">
            <h3>{pkg.name}</h3>
            <p>Price: ${pkg.price}</p>
            <p>Stock: {pkg.stock}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;