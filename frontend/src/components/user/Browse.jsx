import React from "react";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

export default function Browse() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  useGetAllJobs();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? ( // Check if no jobs are found
          <div className="text-center text-xl font-semibold text-gray-500">
            {`No jobs found for ${searchedQuery || "your search"}`}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
