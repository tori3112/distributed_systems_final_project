import React from 'react';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import { Loader } from './Loader';

const TransactionConfirmation = ({ 
  isOpen, 
  onClose,
  transactionHash,
  proposalTitle,
  isProcessing,
  hasError,
  errorMessage
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        {isProcessing ? 'Processing...' : hasError ? 'Submission Failed' : 'Submission Confirmed'}
      </ModalHeader>
      <ModalContent>
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader size="large" />
            <p className="text-gray-600">Processing your proposal...</p>
          </div>
        ) : hasError ? (
            <div className='space-y-4'>
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className='text-red-600 font-semibold'>Order Submission Failed</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-medium">Error:</p>
                    <p className="text-sm text-gray-900">{errorMessage || "An unexpected error occurred while processing your order."}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-700">Please try again or contact customer support if the problem persists.</p>
                </div>
            </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              <p className="text-fuchsia-600 font-semibold">Proposal Submitted Successfully</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Transaction Hash:</p>
              <p className="text-sm text-gray-900 break-all">{transactionHash}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Proposal Title:</p>
              <p className="text-gray-900">{proposalTitle}</p>
            </div>
          </div>
        )}
      </ModalContent>
      {!isProcessing && (
        <ModalFooter>
          <button 
            className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700"
            onClick={onClose}
          >
            Close
          </button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default TransactionConfirmation;