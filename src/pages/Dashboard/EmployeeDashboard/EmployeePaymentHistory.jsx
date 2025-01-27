import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const EmployeePaymentHistory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    // Fetch payment history using react-query
    const { data: PaymentHistory, isLoading } = useQuery({
        queryKey: ["employee-payment-history"],
        queryFn: async () => {
            if (user) {
                const { data } = await axiosPublic.get(`/employee-payment-history?email=${user.email}`);
                return data;
            }
            return [];
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Employee Payment History</h1>
            {PaymentHistory && PaymentHistory.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Month</th>
                                <th className="px-4 py-2">Year</th>
                                <th className="px-4 py-2">Salary</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PaymentHistory.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{payment.month}</td>
                                    <td className="px-4 py-2">{payment.year}</td>
                                    <td className="px-4 py-2">${parseFloat(payment.salary).toFixed(2)}</td>
                                    <td className="px-4 py-2">
                                        {payment.isPending ? (
                                            <span className="text-yellow-200 rounded px-1 bg-orange-600">Pending</span>
                                        ) : (
                                            <span className="text-green-200 bg-green-700 rounded px-1">Paid</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No payment history found.</p>
            )}
        </div>
    );
};

export default EmployeePaymentHistory;
