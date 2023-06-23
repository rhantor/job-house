"use client";

import { useFetchJobsQuery } from "@/redux/features/api/job/jobsApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { timeStamp } from "../components/timestamp";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { searchJob } from "@/redux/features/filter/filterSlice";

const Job = () => {
  const [searchInput, setSearchInput] = useState("");
  const { data: jobs, isLoading, isError, error } = useFetchJobsQuery();
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state?.filter);

  useEffect(() => {
    dispatch(searchJob(searchInput));
  }, [dispatch, searchInput]);

  return (
    <>
      {!isLogin ? (
        <div className="text-center h-[91vh] flex items-center justify-center">
          <h1>
            First you have to
            <Link href={"/register"} className="underline text-blue-700">
              &nbsp; register / login
            </Link>{" "}
          </h1>
        </div>
      ) : (
        <div className="container p-5 sm:pl-10 mx-auto">
          <div className="flex  justify-between items-center mb-6 flex-wrap gap-5">
            <h1 className="text-2xl">Job List {`(${jobs?.length || 0})`}</h1>

            <input
              type="text"
              name="search"
              id="search"
              className="border border-black rounded-md px-2 p-1 outline-none"
              placeholder="search job"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
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
              {jobs
                ?.filter((job) => {
                  return searchQuery.toLowerCase() === ""
                    ? job
                    : job.title.toLowerCase().includes(searchInput);
                })
                .map((job, index) => (
                  <Link
                    href={`/job/${job.id}`}
                    className=" shadow-md border-gray-400  border rounded-md max-w-[600px] mx-auto p-2 flex flex-col gap-2 my-2"
                    key={index}
                  >
                    <h1 className="font-mono capitalize text-xl">
                      {job.title}
                    </h1>
                    <p className="text-base text-[#313131]">
                      {job.desc.length > 100 ? (
                        <>
                          {job.desc.slice(0, 99)} &nbsp;
                          <button type="button" className="text-green-600">
                            See job...
                          </button>
                        </>
                      ) : (
                        job.desc
                      )}
                    </p>
                    <p className="text-sm text-[#595959]">
                      {job.expLvl} - Est. Budget:{" "}
                      <span className="font-medium">${job.price}</span> - Posted
                      &nbsp;
                      {timeStamp(job.timestamp)}
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
      )}
    </>
  );
};

export default Job;
