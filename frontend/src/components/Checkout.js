import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import moment from 'moment-timezone';

export default function Checkout() {
    const { cartItems } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    // State for form validation
    const [valErrors, setValErrors] = useState({});

    // const orderID = useId();

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
                id: 13,
                package_id: Math.floor(Math.random()) || null,
                address: formData.email,
                paid: true,
                order_time: timestamp,
                accom_id: 4,
                ticket_id: item.ticketID || null,
                amount: 1
            }

            // console.log("Order: ", newOrder);
            // console.log("Order JSON: ", JSON.stringify(newOrder));
            console.log('ID: ', typeof newOrder.id);
            console.log('packageID: ', typeof newOrder.package_id);
            console.log('address: ', typeof newOrder.address);
            console.log('paid: ', typeof newOrder.paid);
            console.log('order_time: ', typeof newOrder.order_time);
            console.log('accom_id: ', typeof newOrder.accom_id);
            console.log('ticket_id: ', typeof newOrder.ticket_id);
            console.log('amount: ', typeof newOrder.amount);


            try {
                await axios.post(`${process.env.REACT_APP_REST_URL}/get/package`, newOrder, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log('RESPONSE: ', response);
                });
                alert('Posted new order!')
            } catch (error) {
                console.error('Error posting new order: ', error);

                if (error.code === 'ERR_NETWORK') {
                    <div className="certificate-error">
                        <h4>Certificate Security Issue</h4>
                        <p>Your browser is blocking the connection because the server uses an untrusted security certificate.</p>
                        <p>Options to resolve this:</p>
                        <ol>
                        <li>
                            <strong>Accept the certificate:</strong> Open <a 
                            href="https://tubbybuddy.westus.cloudapp.azure.com:8444" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            >
                            this link
                            </a> in a new tab, click "Advanced" and then "Proceed to site"
                        </li>
                        <li>
                            <strong>Contact support:</strong> Ask the site administrator to install a valid security certificate
                        </li>
                        </ol>
                    </div>
                }
            }

            // // Make the API call to create the package
            // const response = fetch(`${process.env.REACT_APP_REST_URL}/get/package`, {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //     'X-Requested-With': 'XMLHttpRequest'
            // },
            // body: JSON.stringify(newOrder)
            // });
            
            // if (!response.ok) {
            // throw new  Error(`HTTP error! status: ${response.status}`);
            // }
            
            // const data = response.json();
            // console.log('Response from POST: ', data);
        }
    };

  
  return (
    <div className="relative isolate px-6 pt-24 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        <div className='grid grid-cols-4 gap-2'>
            <div className='col-span-3'>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Packages</h2>

                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="py-3 pl-3 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-7">Item</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Price</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Quantity</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Total</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                <td className="py-4 pl-3 pr-3 text-sm font-medium text-gray-900 sm:pl-7">
                                    {item.name}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.ticket}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.accommodation}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    €{item.price}
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        // onClick={handleSubmit}
                        >
                        Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}