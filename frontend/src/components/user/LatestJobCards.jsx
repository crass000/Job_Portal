import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function LatestJobCards({ job }) {
  const navigate = useNavigate();

  const defaultLogo = "https://via.placeholder.com/50?text=Logo";

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-lg bg-white border border-gray-300 hover:shadow-2xl hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer w-[400px] h-[280px] flex flex-col justify-between"
    >
      {/* Top Section: Logo and Company */}
      <div className="flex items-center mb-4">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={job?.company?.logo || defaultLogo}
            alt="Company Logo"
          />
        </Avatar>
        <div className="ml-3">
          <h1 className="font-semibold text-xl text-gray-800 leading-tight">
            {job?.company?.name || "Company Name"}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Middle Section: Job Title */}
      <div className="mb-4 flex-1">
        <h1 className="font-bold text-2xl text-[#333333] leading-snug">
          {job?.title || "Job Title"}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          {job?.description || "Job description not available."}
        </p>
      </div>

      {/* Bottom Section: Job Details */}
      <div className="flex items-center gap-3">
        <Badge className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-md">
          {job?.position || 0} Positions
        </Badge>
        <Badge className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-md">
          {job?.jobType || "Full Time"}
        </Badge>
        <Badge className="text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-md">
          {job?.salary || "N/A"} LPA
        </Badge>
      </div>
    </div>
  );
}
