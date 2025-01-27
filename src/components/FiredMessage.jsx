import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const FiredMessage = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {

        const timer = setTimeout(() => {
            logOut();
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogOut = () => {
        logOut();
        navigate('/')

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg text-center">
                <h1 className="text-2xl font-bold text-red-600">We're Sorry to See You Go</h1>
                <p className="mt-4 text-gray-700">
                    Unfortunately, your access has been revoked. We understand this may be difficult, and we thank you for the time you spent with us.
                </p>
                <p className="mt-2 text-gray-700">
                    If you have any questions or need further assistance, please reach out to our support team.
                </p>
                <button
                    onClick={handleLogOut}
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default FiredMessage;