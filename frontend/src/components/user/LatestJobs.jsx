import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllLatestJobs from "@/hooks/useGetAllLatestJobs";

export default function LatestJobs() {
  useGetAllLatestJobs();
  const { allLatestJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20 mt-[-15px] mx-[80px]">
      {" "}
      <h1 className="text-4xl font-bold">
        <span className="text-[#4C1D95]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allLatestJobs?.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allLatestJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}
