import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useTasks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["my-task", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/all-tasks?email=${user?.email}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching tasks data:", error);
        throw new Error("Error fetching tasks data");
      }
    },
  });

  return { data, refetch, isLoading, isError };
};

export default useTasks;
