import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.jobs) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          dispatch(setAllAdminJobs([]));
        }
      } catch (error) {
        console.error(error);
        dispatch(setAllAdminJobs([]));
      }
    };
    fetchAllAdminJobs();
  }, []);
}
