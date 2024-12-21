import { setAllLatestJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetAllLatestJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllLatestJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllLatestJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllLatestJobs();
  }, []);
}
