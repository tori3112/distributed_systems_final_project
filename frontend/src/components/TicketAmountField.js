import React from 'react';

export function TicketAmountField({ value, onChange, id = "ticketAmount" }) {
  return (
    <div className="w-full mb-4">
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          id={id}
          value={value}
          onChange={onChange}
          min="1"
          max="10"
          className="peer w-full h-fit px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:border-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder=" "
        />
        <label
          htmlFor={id}
          className="absolute left-3 -top-0.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-0.5 peer-focus:text-fuchsia-600 peer-focus:text-sm"
        >
          How many tickets?
        </label>
      </div>
      <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="-mt-px h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      </p>
    </div>
  );
}