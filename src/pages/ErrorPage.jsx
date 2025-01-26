import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-2xl">
                <div className="text-red-500 mb-4">
                    <FaExclamationTriangle className="text-6xl mx-auto" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
                <p className="text-gray-600 mb-6">
                    We can't seem to find the page you're looking for.
                </p>
                <button
                    onClick={handleGoHome}
                    className="btn btn-primary px-6 py-2 text-white rounded-md shadow-md"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
