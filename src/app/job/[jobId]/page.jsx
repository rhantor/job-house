"use client";

import Loading from "@/app/components/Loading";
import ApplyJob from "@/app/job/[jobId]/ApplyJob";
import { useFetchJobQuery } from "@/redux/features/api/job/jobsApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DescPage from "./DescPage";
import EditPost from "./EditPost";
import Proposal from "./Proposal";
const PostId = ({ params }) => {
  const { jobId } = params;
  const { data: job, isLoading, isError, error } = useFetchJobQuery(jobId);
  const { userDetails } = useSelector((state) => state.auth);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    uid,
    desc,
    price,
    expLvl,
    proposals = 0,
    proposalId,
    title,
    timestamp,
    update,
    updatedTime,
  } = job || {};
  const checkApply =
    Array.isArray(proposalId) && proposalId.includes(userDetails.uid);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <div className="container p-5">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        error
      ) : jobId ? (
        <div className="max-w-[800px] mx-auto space-y-6 rounded">
          {isSuccess && (
            <div className="p-2 bg-green-500 text-white w-fit rounded-md">
              ✔ successfully submitted
            </div>
          )}
          <DescPage
            uid={uid}
            desc={desc}
            price={price}
            expLvl={expLvl}
            title={title}
            update={update}
            updatedTime={updatedTime}
            timestamp={timestamp}
            userDetails={userDetails}
          />
          <div>
            <Link
              href={`/submitedProposal/${jobId}`}
              className={` ${
                uid !== userDetails.uid || proposals === 0
                  ? "cursor-default pointer-events-none "
                  : "shadow-md border border-gray-300 rounded p-2 text-sm px-3"
              }`}
            >
              Total submited Proposals :{" "}
              <span className="font-semibold">{proposals || 0}</span>
            </Link>
          </div>

          <div>
            {uid === userDetails?.uid && (
              <EditPost
                setIsDelete={setIsDelete}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                isDelete={isDelete}
                job={job}
                jobId={jobId}
              />
            )}
          </div>

          <div className="apply">
            {isApply && (
              <ApplyJob
                setIsApply={setIsApply}
                job={job}
                jobId={jobId}
                setIsSuccess={setIsSuccess}
              />
            )}
            {userDetails?.role === "freelancer" && !isApply && (
              <div className="sm:space-x-5 space-y-5">
                <button
                  type="button"
                  className={`p-2 px-3 bg-green-500 mr-4 ${
                    checkApply
                      ? "bg-white border-green-500 border text-black"
                      : "text-white"
                  }  rounded-md shadow-lg `}
                  onClick={() => setIsApply(true)}
                  disabled={checkApply}
                >
                  {checkApply ? "You applied this job" : "Apply for this job"}
                </button>

                {checkApply && (
                  <>
                    <button type="button" onClick={() => setShowProposal(true)}>
                      see your proposal...
                    </button>
                    {showProposal && (
                      <Proposal
                        setShowProposal={setShowProposal}
                        showProposal={showProposal}
                        jobId={jobId}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          There Is No job On this url &nbsp;
          <Link href="/job" className="underline text-green-600">
            go back
          </Link>
          &nbsp; to job list page
        </div>
      )}
    </div>
  );
};

export default PostId;
