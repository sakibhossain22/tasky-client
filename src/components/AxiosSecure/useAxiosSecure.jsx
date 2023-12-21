import axios from "axios";
const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
    // baseURL: "https://parcel-pulse-server.vercel.app", // Add the protocol and fix the URL
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
