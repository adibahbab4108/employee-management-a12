
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import SocialLogin from '../components/SocialLogin/SocialLogin';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
const Login = () => {

    const { signIn, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(res => {
                setUser(res.user)
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    title: "Something Went Wrong!",
                    text: `${error.message}`,
                    icon: "warning",
                });
            })
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <Link to="/" className='btn btn-sm'>
                    <FaHome />
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                        <input
                            id="email"
                            type="email"
                            name='email'
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                        <input
                            id="password"
                            type="password"
                            name='password'
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" name='checkbox' className="mr-2 rounded focus:ring-blue-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>

                {/* Register Redirect */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 font-medium hover:underline">Register</Link>
                </p>
                <div className='divider'></div>
                <div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;