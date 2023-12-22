import axios from "axios";
const axiosSecure = axios.create({
    baseURL: `https://tasky-server-chi.vercel.app`
    // baseURL: "https://parcel-pulse-server.vercel.app", // Add the protocol and fix the URL
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
