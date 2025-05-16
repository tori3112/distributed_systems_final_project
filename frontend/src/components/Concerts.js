import React from 'react';

const concerts = [
    {
      title: 'Electric Dreams Festival',
      artist: 'The Neon Lights',
      date: 'Saturday, June 17th',
      venue: 'Tubby Arena',
      image: '/public/concert_image1.jpg',
      link: '/concert/electric-dreams'
    },
    {
      title: 'Rockin\' Summer Nights',
      artist: 'Wildfire Band',
      date: 'Friday, July 21st',
      venue: 'Sunset Stage',
      image: '/images/concert_image2.jpg',
      link: '/concert/rockin-summer-nights'
    },
    {
      title: 'Groove Academy',
      artist: 'DJ Groovy',
      date: 'Saturday, August 19th',
      venue: 'Groove City Hall',
      image: '/images/concert_image3.jpg',
      link: '/concert/groove-academy'
    }
  ];

const Concerts = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto flex flex-col max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                    Check Out Upcoming Concerts
            </h2>
            </div>




            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            {concerts.map((concert, index) => (
                <div key={index} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href={concert.link}>
                    <img class="rounded-t-lg" src={concert.image} alt={`${concert.title} at ${concert.venue}`} />
                </a>
                <div class="p-5">
                    <a href={concert.link}>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{concert.title}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Featuring {concert.artist}<br />
                    {concert.date}<br />
                    {concert.venue}
                    </p>
                    <a href={concert.link} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-blue-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">
                    Read More
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </a>
                </div>
                </div>
            ))}
            </div>


        </div>
        </div>
    );
};

export default Concerts;