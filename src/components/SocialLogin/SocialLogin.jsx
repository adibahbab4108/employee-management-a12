import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'employee'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                icon: "success",
                                title: "Login Successful",
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
                        navigate('/')
                    })
            }
            )
    }
    return (
        <div>
            <div onClick={handleGoogleLogin} className="btn">
                <FaGoogle />
            </div>
        </div>
    );
};

export default SocialLogin;