
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet";
import axios from "axios";
import image from '../../assets/login2.png'
const Login = () => {
    const navigate = useNavigate()
    const { googleLogin, emailLogin } = useContext(AuthContext)
    // console.log(user);
    const location = useLocation()
    // console.log(location);
    const HandleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                if (user) {
                    axios.post('https://quickbite-server.vercel.app/jwt', { user: user?.email }, {
                        withCredentials: true
                    })
                }

                navigate(location.state ? location.state : '/')
                console.log(user)
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    const handleEmailSign = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value;
        const loginData = { email, password }
        console.log(loginData)
        emailLogin(email, password)
            .then(result => {
                const resUser = result.user
                if (resUser) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Login Successful!',
                        confirmButtonText: 'OK'
                    })
                }
                navigate(location.state ? location.state : '/')
            })
            .catch(error => {
                const message = error.message
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                console.log(error.message);
            })
    }
    return (
        <div>
            <Helmet>
                <title>QuickBite || Login</title>
            </Helmet>
            <div className="flex flex-row-reverse w-full items-center justify-center">
                <div className="border lg:w-2/6 rounded-lg p-8">
                    <form onSubmit={handleEmailSign}>
                        <h1 className="text-center text-black text-3xl font-bold uppercase my-5">Login Now</h1>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Type Your Email"
                                className="bg-white mt-1 p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Type Your Password"
                                className="bg-white mt-1 p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <button type="submit" className="w-full py-2 px-4 bg-[#f1c40f] text-white rounded hover:bg-green-700">
                                Login
                            </button>
                        </div>
                        <p className="text-center text-black mb-4">Dont Have An Account? <NavLink className='text-white font-bold bg-green-600 px-2 py-1 rounded' to='/register'>Register</NavLink></p>
                    </form>
                    <button onClick={HandleGoogleLogin} className='flex mx-auto items-center bg-white border lg:p-2 p-1 md:p-2 rounded-lg hover:bg-green-400 transition'>
                        <img className="w-8" src="https://i.ibb.co/zbMdxWH/Google-G-Logo-svg.webp" alt="Google Logo" />
                        <p className="ml-2">Google</p>
                    </button>
                </div>
                <div className="hidden md:block lg:block w-2/6 h-full">
                <img src={image} alt="" />
            </div>
            </div>
        </div>

    );
};

export default Login;