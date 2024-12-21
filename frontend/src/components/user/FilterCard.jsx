import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Noida"],
  },
  {
    filterType: "Industry",
    array: [
      "Software Developer",
      "Frontend Developer",
      "Data Scientist",
      "Architect",
      "App Developer",
      "Fullstack Developer",
    ],
  },
  {
    filterType: "Job Type",
    array: ["Part time", "Full time"],
  },
];

export default function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-4 rounded-md border border-gray-200 shadow-sm">
      <h1 className="font-bold text-xl text-indigo-700">Filter Jobs</h1>
      <hr className="mt-3 mb-4 border-indigo-300" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index1) => (
          <div key={index1} className="mb-5">
            <h1 className="font-semibold text-lg text-indigo-600">
              {data.filterType}
            </h1>
            {data.array.map((item, index2) => {
              const itemId = `id${index1}-${index2}`;
              return (
                <div className="flex items-center space-x-3 my-2" key={index2}>
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="h-5 w-5 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-blue-600"
                  />
                  <Label htmlFor={itemId} className="text-gray-700">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
