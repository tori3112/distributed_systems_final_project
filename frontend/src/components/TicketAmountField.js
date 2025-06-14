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
          className="peer w-full h-14 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:border-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
      </p>
    </div>
  );
}