import React, { useState, useEffect } from 'react';

const concertData = [
  {
    name: "Rock Festival",
    venue: "Stadium Arena",
    accommodation: "Luxury Hotel",
    accommodationRating: "5-star",
    price: "€299",
    stock: 45,
    date: "June 15, 2025"
  },
  {
    name: "Jazz Night",
    venue: "Blue Note Club",
    accommodation: "Boutique Inn",
    accommodationRating: "4-star",
    price: "€199",
    stock: 28,
    date: "July 10, 2025"
  },
  {
    name: "Classical Symphony",
    venue: "Concert Hall",
    accommodation: "Grand Hotel",
    accommodationRating: "5-star",
    price: "€249",
    stock: 60,
    date: "August 5, 2025"
  },
  {
    name: "Pop Music Festival",
    venue: "City Park",
    accommodation: "Urban Lodge",
    accommodationRating: "3-star",
    price: "€149",
    stock: 120,
    date: "July 25, 2025"
  },
  {
    name: "Electronic Dance Night",
    venue: "Club Neon",
    accommodation: "Modern Suites",
    accommodationRating: "4-star",
    price: "€179",
    stock: 35,
    date: "June 30, 2025"
  },
  {
    name: "Country Music Fest",
    venue: "Ranch Arena",
    accommodation: "Countryside Resort",
    accommodationRating: "4-star",
    price: "€229",
    stock: 50,
    date: "August 20, 2025"
  }
];

const ConcertPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch data from an API here
        // const response = await fetch('https://api.example.com/concert-packages');
        // const data = await response.json();
        
        // Using our mock data for now
        setPackages(concertData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch concert packages');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    // Add a small delay to simulate network request
    setTimeout(fetchData, 800);
  }, []);

  // Filter packages based on search term
  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.accommodation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Determine stock status and corresponding class
  const getStockStatus = (stock) => {
    if (stock <= 10) return { text: 'Low Stock', className: 'low-stock' };
    if (stock <= 30) return { text: 'Limited', className: 'limited-stock' };
    return { text: 'Available', className: 'in-stock' };
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <header className="packages-header">
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Concert & Accommodation Packages</h1>
        <p>Find the perfect concert experience with premium accommodation options</p>
      </header>

      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5">
        <input
          type="text"
          placeholder="Search by concert, venue, or accommodation..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {loading && <div className="loading">Loading packages...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <>
          {filteredPackages.length === 0 ? (
            <div className="no-results">No packages match your search criteria</div>
          ) : (
            <div className="bg-red-400">
              <table className="packages-table">
                <thead>
                  <tr>
                    <th>Concert</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Accommodation</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((pkg, index) => {
                    const stockStatus = getStockStatus(pkg.stock);
                    
                    return (
                      <tr key={index}>
                        <td className="font-medium text-gray-900 whitespace-nowrap">{pkg.name}</td>
                        <td>{pkg.venue}</td>
                        <td>{pkg.date}</td>
                        <td>{pkg.accommodation}</td>
                        <td>{pkg.accommodationRating}</td>
                        <td className="price">{pkg.price}</td>
                        <td className={`stock-status ${stockStatus.className}`}>
                          {stockStatus.text} ({pkg.stock})
                        </td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConcertPackages;
