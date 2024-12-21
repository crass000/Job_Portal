import React from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";

export default function Applicants() {

  useGetAllApplicants();
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <ApplicantsTable />
      </div>
    </div>
  );
}
