import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export default function Job({ job }) {
  const navigate = useNavigate();
  // Calculate days ago
  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currTime = new Date();
    const timeDiff = currTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="h-full flex flex-col p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out max-w-xs sm:max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full w-8 h-8 flex items-center justify-center"
          size="icon"
        >
          <Bookmark size={18} />
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={job?.company?.logo || "https://via.placeholder.com/50"}
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg leading-tight">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <h2 className="font-bold text-lg mb-2 leading-snug">{job?.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
        {job?.description}
      </p>
      <div className="flex items-center gap-2 mb-5">
        <Badge className="text-blue-700 bg-blue-100 font-semibold px-2 py-1 rounded">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-600 bg-red-100 font-semibold px-2 py-1 rounded">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-700 bg-green-100 font-semibold px-2 py-1 rounded">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 w-1/2 text-sm py-2"
        >
          Details
        </Button>
        <Button className="bg-indigo-700 text-white hover:bg-indigo-800 transition-all duration-300 w-1/2 text-sm py-2">
          Save For Later
        </Button>
      </div>
    </div>
  );
}
