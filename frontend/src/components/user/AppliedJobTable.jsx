import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

export default function AppliedJobTable() {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead style={{ color: "black" }}>Date</TableHead>
            <TableHead style={{ color: "black" }}>Job Role</TableHead>
            <TableHead style={{ color: "black" }}>Company</TableHead>
            <TableHead style={{ color: "black" }}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs?.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <span>{`You haven't applied to any job yet`}</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
