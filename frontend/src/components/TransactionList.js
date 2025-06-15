import React from "react";
import { useAllTransactions } from "../api/hooks/useTransactions";
import Loader from "./Loader";

export default function TransactionList() {
    const { data: orders, loading, error } = useAllTransactions();

    if (loading) return (
        <Loader />
    );

    if (error) return (
        <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
            <div>Error: {error.message}</div>
        </div>
    );

    if (!orders || orders.length === 0) return (
        <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div>No orders available</div>
        </div>
    ); 

    return (
        <div className="relative isolate px-6 pt-24 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Transaction Overview</h1>
            <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
                <div className="text-center md:border-r">
                    <h6 className="text-4xl font-bold text-fuchsia-800">6734</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase">Number of transactions</p>
                </div>
                <div className="text-center md:border-r">
                    <h6 className="text-4xl font-bold text-fuchsia-800">98.34%</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase">Success Rate</p>
                </div>
                <div className="text-center md:border-r">
                    <h6 className="text-4xl font-bold text-fuchsia-800">23.1 ms</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase">Average Time</p>
                </div>
                <div className="text-center">
                    <h6 className="text-4xl font-bold text-fuchsia-800">3</h6>
                    <p className="text-sm font-medium tracking-widest text-gray-800 uppercase">Number of Servers</p>
                </div>
            </div>

            <div className="w-full px-4 py-5 bg-white space-y-6 sm:p-6">
                    <table className="min-w-full divide-y divide-fuchsia-200">
                        <thead className='text-xs font-bold tracking-widest text-gray-700 uppercase bg-fuchsia-50'>
                        <tr>
                            <th className="py-3 pl-3 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-7">Order</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Address</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Package</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Ticket</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Accommodation</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Timestamp</th>
                            <th className="px-3 py-3 text-left text-sm font-medium text-gray-900">Paid</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-fuchsia-200">
                            {orders.map((item) => (
                                <tr key={item.id}>
                                <td className="py-4 pl-3 pr-3 text-sm font-mw-full sm:w-1/3edium text-gray-900 sm:pl-7">
                                    {item.id}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.address}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.package_id}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.ticket_id}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.accom_id}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.order_time}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.paid ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                                            No
                                        </span>
                                    )}
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

        </div>
    )

}