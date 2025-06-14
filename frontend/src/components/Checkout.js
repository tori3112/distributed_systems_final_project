import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import moment from 'moment-timezone';
import  { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';

import TransactionConfirmation from './TransactionConfirmation';

function generateId() {
    const uuid = uuidv4();
    const uuidInteger = parseInt(uuid.replace(/-/g, '').substring(0, 8), 16) % 1000000000;
    return uuidInteger;
}

export default function Checkout() {
    const { isAuthenticated, 
    loginWithRedirect, 
    getAccessTokenSilently
    } = useAuth0();

    const { cartItems, totalPrice } = useCart();

    const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
        });

    // State for form validation
    const [valErrors, setValErrors] = useState({});

    // For confirmation window
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleConfirmationModal = () => {
        console.log('Transaction Confirmation open');
        setIsConfirmationModalOpen(true);
    };
    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        setValErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.error('Validate Error: ', valErrors);
            return;
        }

        console.log('Form submitted with data:', formData);
        console.log('Cart items:', cartItems);

        const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');

        for (const item of cartItems) {
            // Create an order
            const newOrder = {
                id: generateId(),
                package_id: item.package_id,
                address: formData.email,
                paid: true,
                order_time: timestamp,
                accom_id: item.accom_id,
                ticket_id: item.ticket_id,
                stock: item.ticket_quantity
            }

            console.log("New order: ", newOrder);

            try {
                setIsProcessing(true);
                const token = await getAccessTokenSilently();
                console.log(token);

                await axios.post(`${process.env.REACT_APP_REST_URL}/get/package`, newOrder, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                setIsConfirmationModalOpen(true);
                
            } catch (error) {
                if (error.response) {
                    // The server responded with a status code outside the 2xx range
                    console.error("Server error details:", error.response.data);
                    console.error("Status code:", error.response.status);
                    setErrorMessage(error.response.data.message || `Server error: ${error.response.status}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                    setErrorMessage("No response received from server. Please check your connection.");
                } else {
                    // Something happened in setting up the request
                    console.error("Error setting up request:", error.message);
                    setErrorMessage(error.message || "An unexpected error occurred.");
                }

                setIsConfirmationModalOpen(true);

            } finally {
                setIsProcessing(false);
            }
        }
    };

    if (!isAuthenticated) {
        loginWithRedirect({
            appState: {returnTo: window.location.pathname}
        });
        return <div>Redirecting to login...</div>
    }
  
  return (
    <div className="relative isolate px-6 pt-24 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='col-span-1 md:col-span-2'>
                <div className="w-full px-4 py-5 bg-white space-y-6 sm:p-6">
                    <table className="min-w-full divide-y divide-fuchsia-200">
                        <thead className='text-xs font-bold text-gray-700 uppercase bg-fuchsia-50'>
                        <tr>
                            <th className="py-3 pl-3 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-7">Package</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Concert</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Accommodation</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Price</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-fuchsia-200">
                            {cartItems.map((item) => (
                                <tr key={item.package_id}>
                                <td className="py-4 pl-3 pr-3 text-sm font-mw-full sm:w-1/3edium text-gray-900 sm:pl-7">
                                    {item.name}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.ticket}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.accom_address}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    €{item.price}
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex flex-row w-full px-4 py-3 border-t-2 border-fuchsia-200 sm:p-6'>
                        <h2 className='basis-1/3 flex-none text-xl font-semibold text-gray-900'>Total</h2>
                        <div className='basis-2/3 m-auto flex justify-end'>€{totalPrice()}</div>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
                
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        </div>
                        
                        <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        </div>
                    </div>
                
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                        />
                    </div>
                
                    <div className="mt-8">
                        <button
                        type="submit"
                        className="w-full bg-fuchsia-600 text-white py-3 px-4 rounded-md hover:bg-fuchsia-700 transition"
                        onClick={handleConfirmationModal}
                        >
                        Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {isConfirmationModalOpen && (
            <TransactionConfirmation 
                onClose={closeConfirmationModal}
                proposalTitle={`Order for ${formData.firstName} ${formData.lastName}`}
                isProcessing={isProcessing}
                errorMessage={errorMessage}
            />
            )}
    </div>
  )
}