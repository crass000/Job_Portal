import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetAppliedJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success && res.data.application) {
          dispatch(setAllAppliedJobs(res.data.application));
        } else {
          dispatch(setAllAppliedJobs([])); 
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllAppliedJobs([]));
      }
    };
    fetchAppliedJobs();
  }, []);
}
