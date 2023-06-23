"use client";
import { useFetchFreelancerProposalsQuery } from "@/redux/features/api/job/jobsApi";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { timeStamp } from "../components/timestamp";

const Proposals = () => {
  const { userDetails } = useSelector((state) => state?.auth);
  const { uid } = userDetails || {};
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useFetchFreelancerProposalsQuery(uid);
  return (
    <div className="container p-5 sm:pl-10 mx-auto">
      <h1 className="text-2xl mb-5">
        Total Submited Proposal {`(${jobs?.length || 0})`}
      </h1>
      {isLoading ? (
        <>
          {["1", "2", "3", "4"].map((i, index) => (
            <React.Fragment key={index}>
              <Loading />
            </React.Fragment>
          ))}
        </>
      ) : isError ? (
        error
      ) : jobs.length > 0 ? (
        <div className="space-y-5">
          {jobs?.map((job, index) => (
            <Link
              href={`/job/${job.id}`}
              className=" shadow-md border-gray-400  border rounded-md max-w-[600px] mx-auto p-2 flex flex-col gap-2 my-2"
              key={index}
            >
              <h1 className="font-mono capitalize text-xl">{job.title}</h1>
              <p className="text-sm text-[#595959]">
                {job.expLvl} - Est. Budget:{" "}
                <span className="font-medium">${job.price}</span>
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <h1 className="text-red-500">There is no jobs</h1>{" "}
        </>
      )}
    </div>
  );
};

export default Proposals;
