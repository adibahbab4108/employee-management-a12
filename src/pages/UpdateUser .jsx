import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useUserInfo from "../hooks/useUserInfo";

const UpdateUser = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const email = user?.email;
    const { refetch, userData, isLoading, isError, error } = useUserInfo();
    const { register, handleSubmit, reset } = useForm();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await axiosPublic.patch(`/users/${email}`, data);

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated successfully",
                })
            } else {
                Swal.fire({
                    title: " Already up-to-date",
                })
            }
            refetch();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to update user data",
                text: `${error}`,
            })
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-4 bg-green-100 min-h-screen pt-10">
            {/* User Profile Section */}
            {userData ? (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center">
                    {/* User Photo */}
                    {userData.photo && (
                        <img
                            src={userData.photo}
                            alt="User"
                            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                        />
                    )}

                    {/* User Info */}
                    <div className="mt-4 text-center">
                        {
                            <p className="text-2xl font-bold text-gray-800">Name: {userData.name}</p>
                        }
                        {
                            <p className="text-gray-600 mt-2 text-sm ">
                                <span className="font-medium ">Email:</span> {userData.email}
                            </p>
                        }
                        {
                            <p className="text-gray-700 mt-2 text-sm bg-blue-100 py-1 px-3 rounded-full shadow capitalize">
                                <span className="font-medium u">Role:</span> {userData.role}
                            </p>
                        }

                        <div className="border my-4 p-6 md:flex  gap-4">
                            {
                                <p className="text-gray-700 mt-2 text-sm bg-blue-100  py-1 px-3 rounded-lg shadow capitalize">
                                    <span className="font-medium">Designation:</span> {userData.designation ||"N/A"}
                                </p>
                            }
                            {
                                    <p className="text-gray-700 mt-2 text-sm bg-blue-100  py-1 px-3 rounded-lg shadow capitalize">
                                        <span className="font-medium">Bank Account No:</span> {userData.bank_account_no || "N/A"}
                                    </p>
                            }
                            {
                                    <p className="text-gray-700 mt-2 text-sm bg-blue-100  py-1 px-3 rounded-lg shadow capitalize">
                                        <span className="font-medium">Current Salary:</span> ${userData.salary || 0}
                                    </p>
                            }
                        </div>
                    </div>
                </div>

            ) : (
                <p>Loading user data...</p>
            )}

            {/* Update Form Section */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow space-y-4"
            >
                <h2 className="text-lg font-bold">Update User Information</h2>

                {/* Bank Account No */}
                <div>
                    <label className="block font-medium mb-1" htmlFor="bank_account_no">
                        Bank Account No
                    </label>
                    <input
                        type="number"
                        id="bank_account_no"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your bank account number"
                        {...register("bank_account_no")}
                    />
                </div>

                {/* Salary */}
                <div>
                    <label className="block font-medium mb-1" htmlFor="salary">
                        Salary
                    </label>
                    <input
                        type="number"
                        id="salary"
                        placeholder="Salary in $"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("salary", { required: true })}
                    />
                </div>

                {/* Designation */}
                <div>
                    <label className="block font-medium mb-1" htmlFor="designation">
                        Designation
                    </label>
                    <select
                        id="designation"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("designation")}
                        defaultValue=""
                    >
                        <option value="" disabled>Select Designation</option>
                        <option value="Sales Assistant">Sales Assistant</option>
                        <option value="Social Media Executive">Social Media Executive</option>
                        <option value="Digital Marketer">Digital Marketer</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
