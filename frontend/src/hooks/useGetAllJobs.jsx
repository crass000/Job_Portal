import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

export default function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery, allJobs } = useSelector((store) => store.job);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `${JOB_API_END_POINT}/get`;
      if (searchedQuery) {
        url = `${url}?keyword=${searchedQuery}`;
      }
      const res = await axios.get(url, { withCredentials: true });

      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      } else {
        dispatch(setAllJobs([]));
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, searchedQuery]);

  useEffect(() => {
    if (searchedQuery !== "") {
      fetchAllJobs();
    }
  }, [searchedQuery, fetchAllJobs]);

  return { isLoading, error, allJobs };
}
