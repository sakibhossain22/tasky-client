import axios from "axios";
const axiosSecure = axios.create({
    baseURL: `https://tasky-server-chi.vercel.app`
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
