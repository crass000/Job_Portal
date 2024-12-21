import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center mt-[-10px]">
      <div className="flex flex-col gap-3 my-6">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          {" "}
          No 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold mt-3">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#4C1D95]">Dream Job</span>
        </h1>
        <p className="italic text-lg text-gray-600 mx-auto my-3 max-w-2xl px-4">
          {'"'}Unlock a world of career possibilities, connect with leading
          companies, and take your career to the next level with ease.{'"'}
        </p>
        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto my-3">
          <input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#4C1D95]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
