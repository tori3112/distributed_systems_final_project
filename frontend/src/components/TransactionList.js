import React from "react";

const transactions = [
  {
    id: 1,
    package_id: 101,
    address: "123 Main St, Anytown, USA",
    paid: true,
    order_time: "2024-05-10T10:00:00Z",
    accom_id: null,
    ticket_id: 5001,
    status: "completed",
    last_updated: "2024-05-10T10:05:00Z",
    orderId: 10001
  },
  {
    id: 2,
    package_id: null,
    address: "456 Oak Ave, Somewhere, USA",
    paid: false,
    order_time: "2024-05-11T11:30:00Z",
    accom_id: 201,
    ticket_id: null,
    status: "pending",
    last_updated: "2024-05-11T11:30:00Z",
    orderId: 10002
  },
  {
    id: 3,
    package_id: 102,
    address: "789 Pine Rd, Otherville, USA",
    paid: true,
    order_time: "2024-05-12T14:00:00Z",
    accom_id: null,
    ticket_id: 5002,
    status: "completed",
    last_updated: "2024-05-12T14:05:00Z",
    orderId: 10003
  },
  {
    id: 4,
    package_id: 103,
    address: "321 Elm St, Villagetown, USA",
    paid: true,
    order_time: "2024-05-13T09:15:00Z",
    accom_id: 202,
    ticket_id: null,
    status: "shipped",
    last_updated: "2024-05-13T09:30:00Z",
    orderId: 10004
  },
  {
    id: 5,
    package_id: null,
    address: "654 Birch Ln, Cityville, USA",
    paid: false,
    order_time: "2024-05-14T16:45:00Z",
    accom_id: null,
    ticket_id: 5003,
    status: "cancelled",
    last_updated: "2024-05-14T17:00:00Z",
    orderId: 10005
  }
];

console.log(transactions);

export default function TransactionList() {


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
                    <table className="min-w-full text-sm text-left divide-y divide-fuchsia-200">
                        <thead className='text-xs font-bold text-gray-700 uppercase bg-fuchsia-50'>
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
                            {transactions.map((item) => (
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