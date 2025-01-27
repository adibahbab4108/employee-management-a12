import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MessageRequest = () => {
    const [isGridView, setIsGridView] = useState(true); // Toggle state for Grid/Table view
    const axiosPublic = useAxiosPublic();

    // Fetch messages using react-query
    const { data: messages = [], isLoading, isError } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/contact-form-data');
            return data;
        },
    });

    if (isLoading) {
        return <div className="text-center mt-10 text-lg">Loading messages...</div>;
    }

    if (isError) {
        return <div className="text-center mt-10 text-lg text-red-500">Error fetching messages!</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Message Requests</h1>
                <button
                    onClick={() => setIsGridView(!isGridView)}
                    className={`px-4 py-2 rounded-lg transition ${isGridView ? 'bg-blue-600 text-white' : 'bg-lime-600 text-white'
                        }`}
                >
                    {isGridView ? 'Switch to Table View' : 'Switch to Grid View'}
                </button>
            </div>

            {messages.length === 0 ? (
                <div className="text-center text-gray-500">No messages found.</div>
            ) : isGridView ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">{message.name}</h2>
                            <p className="text-gray-600 text-sm">{message.email}</p>
                            <h3 className="mt-3 text-lg font-semibold text-gray-700">Subject:</h3>
                            <p className="text-gray-800">{message.subject}</p>
                            <h3 className="mt-3 text-lg font-semibold text-gray-700">Message:</h3>
                            <p className="text-gray-800">{message.message}</p>
                        </div>
                    ))}
                </div>
            ) : (
                // Table View
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Subject</th>
                                <th className="px-4 py-2 text-left">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message) => (
                                <tr key={message._id} className="border-t">
                                    <td className="px-4 py-2">{message.name}</td>
                                    <td className="px-4 py-2">{message.email}</td>
                                    <td className="px-4 py-2">{message.subject}</td>
                                    <td className="px-4 py-2">{message.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MessageRequest;
