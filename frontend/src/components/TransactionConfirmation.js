import React from 'react';
import Loader from './Loader';

const TransactionConfirmation = ({
  onClose,
  proposalTitle,
  isProcessing,
  errorMessage
}) => {

    const safeErrorMessage = errorMessage || "Unexpected error occurred.";
    const safeTitle = proposalTitle || "Your Order";
    console.log('Error message: ', safeErrorMessage);
    console.log('Title: ', safeTitle);

    try {
      if (isProcessing) {
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader />
            <p className='text-gray-600'>Processing your order...</p>
          </div>
        );
      } else if (errorMessage) {
        return (
          <div className='space-y-4'>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className='text-red-600 font-semibold'>Order Submission Failed</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="font-medium">Error:</p>
              <p className="text-sm text-gray-900">{safeErrorMessage}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">Please try again or contact customer support if the problem persists.</p>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400"
            >
              Close
            </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="text-fuchsia-600 font-semibold">Order Submitted Successfully</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Order Details:</p>
              <p className="text-gray-900">{safeTitle}</p>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error rendering modal content:", error);
      return (
        <div className="space-y-4">
          <p className="text-red-600">There was an error displaying this content.</p>
        </div>
      );
    }

};

export default TransactionConfirmation;