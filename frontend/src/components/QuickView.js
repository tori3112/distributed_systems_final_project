'use client'
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon, CheckIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function QuickView({ product, onClose }) {
  // Initialize state with default values
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : null);

  // If product is not available, return null
  if (!product) return null;

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          
            <div className="relative flex w-2/3 items-center rounded-md overflow-hidden bg-fuchsia-100 px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>
                  <h3>{product.color}</h3>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">{product.price}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                'size-5 shrink-0',
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">{product.rating} out of 5 stars</p>
                        <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          {product.reviewCount} reviews
                        </a>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="self-end options-heading" className="mt-10">

                    <form>

                    <div id="date-range-picker" date-rangepicker className="flex items-center p-2.5">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-fuchsia-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input id="datepicker-range-start" name="start" type="text" className="bg-fuchsia-50 border border-gray-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full ps-10 p-2.5" placeholder="Select date start" />
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-fuchsia-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input id="datepicker-range-end" name="end" type="text" className="bg-fuchsia-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Select date end"/>
                    </div>
                    </div>

                      <ul
                        role="list"
                        className={classNames(
                            product.offer ? 'text-gray-700' : 'text-gray-600',
                            'mt-8 space-y-3 text-sm/6 sm:mt-10',
                        )}
                        >
                        {product.offer.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                                aria-hidden="true"
                                className={classNames(product.offer ? 'text-fuchsia-500' : 'text-fuchsia-600', 'h-6 w-5 flex-none')}
                            />
                            {feature}
                            </li>
                        ))}
                        </ul>

                      <button
                        type="submit"
                        className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-fuchsia-600 px-8 py-3 text-base font-medium text-white hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        Book
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
        </div>
      </div>
    </Dialog>
  );
}