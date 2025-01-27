import React from 'react';
import { useForm } from 'react-hook-form';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import axios from 'axios';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (userData) => {
        const { fullName, email, photo, userRole, password, confirmPassword } = userData

        if (password != confirmPassword) return alert("Password Didn't Match")

        //profile image upload to imgbb
        const formData = new FormData()
        formData.append('image', photo[0])
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgbbApi}`, formData)
        const img_url = data.data.display_url;



        createUser(email, password)
            .then(() => {
                updateUserProfile(fullName, img_url)
                const userInfo = {
                    name: fullName,
                    email: email,
                    photo: img_url,
                    role: userRole,
                    isVerified: false,

                }
                //storing user info to database
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Registration Successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Something went wrong!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })

                navigate('/login');
            })
            .catch(error => {
                Swal.fire({
                    title: "Something Went Wrong!",
                    text: `${error.message}`,
                });
            })
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <Link to="/" className='btn btn-sm'>
                    <FaHome />
                </Link>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name Field */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name:</label>
                        <input
                            id="fullName"
                            type="text"
                            {...register('fullName', { required: 'Full Name is required.' })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address.',
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    {/* Upload photo */}
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">Photo URL:</label>
                        <input
                            id="photo"
                            type="file"
                            name='photo'
                            accept='image/*'
                            {...register('photo')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
                    </div>
                    {/* User Role */}
                    <div>
                        <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("userRole", )}
                            defaultValue=""
                        >
                            <option value="" disabled >Select your role</option>
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                        </select>
                        {errors.userRole && <span className="text-red-500 text-sm">{errors.userRole.message}</span>}
                    </div>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long.',
                                },
                                validate: {
                                    hasLowercase: (value) =>
                                        /[a-z]/.test(value) || 'Password must include at least one lowercase letter.',
                                    hasUppercase: (value) =>
                                        /[A-Z]/.test(value) || 'Password must include at least one uppercase letter.',
                                    hasSpecialChar: (value) =>
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must include at least one special character.',
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password.',
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Re-enter your password"
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 font-medium hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
