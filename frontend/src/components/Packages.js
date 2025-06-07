import React, { useState, useRef, useEffect } from 'react';
import Concerts from './Concerts';
import Accommodations from './Accommodation';

export default function Packages() {
  const [activeTab, setActiveTab] = useState('tab1-group4');
  const indicatorRef = useRef(null);
  const tabsRef = useRef({});
  
  // Add these state variables for package creation
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [availableAccommodations, setAvailableAccommodations] = useState(null);
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);
  
  // Function to handle tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  // Add this function to handle concert selection
  const handleConcertSelect = async (concert) => {
    setSelectedConcert(concert);
    setIsCreatingPackage(true);
    setActiveTab('tab2-group4'); // Switch to accommodation tab
    
    try {
      const concertDate = new Date(concert.date);
      const formattedDate = concertDate.toISOString().split('.')[0];
      const encodedDate = encodeURIComponent(formattedDate);

      const apiUrl = `${process.env.REACT_APP_REST_URL}/tickets/${encodedDate}/accoms`;

      const response = await fetch(apiUrl);
    
      if (!response.ok) {
        if (response.status === 404) {
          setAvailableAccommodations([]);
        } else {
          throw new Error(`API error: ${response.status}`);
        }
        return;
      }

      const data = await response.json();

      let accommodations = [];
      if (Array.isArray(data)) {
        accommodations = data;
      } else if (data && data._embedded && Array.isArray(data._embedded.accomList)) {
        accommodations = data._embedded.accomList;
      }
      
      setAvailableAccommodations(accommodations);
    } catch (error) {
      console.error('Error fetching available accommodations:', error);
      setAvailableAccommodations([]);
    }
  };
  
  // Update the indicator position when active tab changes
  useEffect(() => {
    if (indicatorRef.current && tabsRef.current[activeTab]) {
      const activeTabElement = tabsRef.current[activeTab];
      const indicator = indicatorRef.current;
      // Set the width and position of the indicator
      indicator.style.width = `${activeTabElement.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTabElement.offsetLeft}px) scaleX(1)`;
    }
  }, [activeTab]);
  
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <p className="mx-auto mt-6 max-w-2xl text-center text-md font-medium text-pretty text-gray-600 sm:text-md/3">
        We believe seeing your favorite artists shouldn't empty your wallet. At TubbyPackages, we're committed to offering transparent and competitive pricing for our concert and accommodation packages.
      </p>
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative tab-group">
          <div className="flex border-b border-stone-200 relative" role="tablist">
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-stone-800 transition-transform duration-300 transform"
              style={{ width: '0px', transform: 'translateX(0px) scaleX(0)' }}
            ></div>
            <button
              type="button"
              ref={el => tabsRef.current['tab1-group4'] = el}
              className={`tab-link text-sm ${activeTab === 'tab1-group4' ? 'active text-stone-800' : 'text-stone-500'} inline-block py-2 px-4 hover:text-stone-800 transition-colors duration-300 mr-1`}
              onClick={() => handleTabClick('tab1-group4')}
              role="tab"
              aria-selected={activeTab === 'tab1-group4'}
              aria-controls='tab1-group4'
            >
              Concerts
            </button>
            <button
              type="button"
              ref={el => tabsRef.current['tab2-group4'] = el}
              className={`tab-link text-sm ${activeTab === 'tab2-group4' ? 'active text-stone-800' : 'text-stone-500'} inline-block py-2 px-4 hover:text-stone-800 transition-colors duration-300 mr-1`}
              onClick={() => handleTabClick('tab2-group4')}
              role="tab"
              aria-selected={activeTab === 'tab2-group4'}
              aria-controls='tab2-group4'
            >
              Accommodation
            </button>
          </div>
          <div className="mt-4 tab-content-container">
            <div
              id="tab1-group4"
              className={`tab-content text-stone-500 text-sm ${activeTab === 'tab1-group4' ? 'block' : 'hidden'}`}
              role="tabpanel"
              aria-labelledby='tab1-group4'
            >
              <Concerts onSelectConcert={handleConcertSelect} />
            </div>
            <div
              id="tab2-group4"
              className={`tab-content text-stone-500 text-sm ${activeTab === 'tab2-group4' ? 'block' : 'hidden'}`}
              role="tabpanel"
              aria-labelledby='tab2-group4'
            >
              <Accommodations 
                availableAccommodations={availableAccommodations}
                selectedConcert={selectedConcert}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}