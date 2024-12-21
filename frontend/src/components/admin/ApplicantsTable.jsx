import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = [
  { label: "Accept", value: "Accepted" },
  { label: "Reject", value: "Rejected" },
];

export default function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  // Local state to manage pending applicants
  const [pendingApplicants, setPendingApplicants] = useState([]);

  useEffect(() => {
    const filtered = applicants?.applications?.filter(
      (item) => item?.status === "pending"
    );
    setPendingApplicants(filtered || []);
  }, [applicants]);

  // Status handler to update the status via API
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // Update the local state to remove the updated application
        setPendingApplicants((prev) => prev.filter((item) => item?._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl my-5">
        Applicants ({pendingApplicants?.length})
      </h1>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead style={{ color: "black" }}>FullName</TableHead>
            <TableHead style={{ color: "black" }}>Email</TableHead>
            <TableHead style={{ color: "black" }}>Contact</TableHead>
            <TableHead style={{ color: "black" }}>Resume</TableHead>
            <TableHead style={{ color: "black" }}>Date</TableHead>
            <TableHead className="text-right" style={{ color: "black" }}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingApplicants.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span style={{ color: "gray" }}>No resume uploaded</span>
                )}
              </TableCell>
              <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-28">
                    {shortlistingStatus.map((status, index) => {
                      const Icon =
                        status.value === "Accepted" ? FaCheck : FaTimes;
                      return (
                        <div
                          onClick={() => statusHandler(status.value, item?._id)}
                          className="flex items-center my-2 cursor-pointer space-x-2"
                          key={index}
                        >
                          <Icon
                            className={
                              status.value === "Accepted"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          />
                          <span>{status.label}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
