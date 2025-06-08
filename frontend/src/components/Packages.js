import React, { useState, useRef, useEffect } from 'react';
import Concerts from './Concerts';
import Accommodations from './Accommodation';
import { useCart } from '../context/CartContext';

export default function Packages() {
  const [activeTab, setActiveTab] = useState('tab1-group4');
  const indicatorRef = useRef(null);
  const tabsRef = useRef({});
  
  // Add these state variables for package creation
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [availableAccommodations, setAvailableAccommodations] = useState(null);
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);

  const { addToCart} = useCart();
  
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
      console.log('About to fetch ', apiUrl);

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
      console.log('API response data: ', data);

      let accommodations = [];
      if (data && data._links && data._links.self && data._links.self.href) {
        console.log("Following self link: ", data._links.self.href);

        try {
          const followUp = await fetch(data._links.self.href);

          if (!followUp.ok) {
            throw new Error(`Self link request failed: ${followUp.status}`);
          }

          const accommodationData = await followUp.json();
          console.log('Self link response: ', accommodationData);

          if (Array.isArray(accommodationData)) {
            console.log('accommodationData is an Array');
            accommodations = accommodationData;
          } else if (accommodationData && accommodationData._embedded	&& accommodationData._embedded.accommodationList) {
            accommodations = accommodationData._embedded.accommodationList;
          } else {
            console.log('Could not accommodation array in the response: ', accommodationData);

            for (const key in accommodationData) {
              if (accommodationData[key] &&
                typeof accommodationData[key] == 'object' &&
                accommodationData[key]._embedded
              ) {
                for (const embeddedKey in accommodationData[key]._embedded) {
                  console.log(`Found array in _embedded.${embeddedKey}`);
                  accommodations = accommodationData[key]._embedded[embeddedKey];
                  break;
                }
              }
            }
          }
          
        } catch (linkError) {
        console.error('Error following accommodations link: ', linkError);
        }
      
        console.log('Setting availableAccommodations to: ', accommodations);
        console.log('Accommodations length is ', accommodations.length);
        setAvailableAccommodations(accommodations);
      }
    } catch (error) {
      console.error('Error fetching available accommodations: ', error);
      setAvailableAccommodations([]);
    }
  };

  const handleAccommodationSelect = async (accommodation) => {
    try {
      // Create the package object
      const newPackage = {
        ticket: selectedConcert.id,
        accommodation: accommodation.id,
        paid: true,
        date: Date.now()
      };
      
      console.log("Creating package:", newPackage);

      addToCart(newPackage);
      
      // // Make the API call to create the package
      // const response = await fetch(`${process.env.REACT_APP_REST_URL}/get/package`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'X-Requested-With': 'XMLHttpRequest'
      //   },
      //   body: JSON.stringify(newPackage)
      // });
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      
      // const data = await response.json();
      // console.log('Package created:', data);
      
      // // Show success message
      // alert('Package created successfully!');
      
      // // Reset the package creation process
      // setSelectedConcert(null);
      // setIsCreatingPackage(false);
      // setAvailableAccommodations(null);
      // setActiveTab('tab1-group4'); // Switch back to concerts tab
      
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Failed to create package. Please try again.');
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
                onSelectAccommodation={handleAccommodationSelect}
                isCreatingPackage={isCreatingPackage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}