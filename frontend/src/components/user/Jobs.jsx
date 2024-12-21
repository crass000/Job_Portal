import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


export default function Jobs() {
  const { allLatestJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allLatestJobs);
  useEffect(() => {
    if (searchedQuery) {
      const formattedQuery = searchedQuery.replace(/\s+/g, "").toLowerCase();

      const filteredJobs = allLatestJobs.filter((job) => {
        return (
          job.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(formattedQuery) ||
          job.description
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(formattedQuery) ||
          job.location
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(formattedQuery) ||
          job.jobType.replace(/\s+/g, "").toLowerCase().includes(formattedQuery)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allLatestJobs);
    }
  }, [allLatestJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <div className="flex justify-center items-center h-[80vh] mx-80 ">
              <span className="text-2xl font-bold text-gray-500">
                No Jobs Found
              </span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs?.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
