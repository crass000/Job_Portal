import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "Software Developer",
  "Fullstack Developer",
  "App Developer",
];

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="mt-[-30px]">
      {" "}
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full text-[#4C1D95] border-[#4C1D95] hover:bg-[#4C1D95] hover:text-white transition-colors duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#4C1D95] text-white hover:bg-white hover:text-[#4C1D95] border border-[#4C1D95] transition-colors duration-300" />
        <CarouselNext className="bg-[#4C1D95] text-white hover:bg-white hover:text-[#4C1D95] border border-[#4C1D95] transition-colors duration-300" />
      </Carousel>
    </div>
  );
}
