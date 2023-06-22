"use client";

import Loading from "@/app/components/Loading";
import ApplyJob from "@/app/job/[jobId]/ApplyJob";
import {
  useFetchJobQuery,
  useSubmitProposalMutation,
} from "@/redux/features/api/job/jobsApi";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DescPage from "./DescPage";
import EditPost from "./EditPost";
const PostId = ({ params }) => {
  const { jobId } = params;
  const { data: job, isLoading, isError, error } = useFetchJobQuery(jobId);
  const { userDetails } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [{ isSuccess }] = useSubmitProposalMutation();

  const {
    uid,
    desc,
    price,
    expLvl,
    proposals,
    proposalId,
    title,
    timestamp,
    update,
    updatedTime,
  } = job || {};
  const checkApply =
    Array.isArray(proposalId) && proposalId.includes(userDetails.uid);

  return (
    <div className="container p-5">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        error
      ) : jobId ? (
        <div className="max-w-[800px] mx-auto space-y-6">
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
            <h1>
              Total submited Proposals :{" "}
              <span className="font-semibold">{proposals || 0}</span>
            </h1>
          </div>

          <div>
            {uid === userDetails?.uid && (
              <EditPost
                setIsOpen={setIsOpen}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                isOpen={isOpen}
                job={job}
                jobId={jobId}
              />
            )}
          </div>

          <div className="apply">
            {isApply && (
              <ApplyJob setIsApply={setIsApply} job={job} jobId={jobId} />
            )}
            {userDetails?.role === "freelancer" && !isApply && (
              <>
                <button
                  type="button"
                  className={`p-2 px-3 bg-green-500 ${
                    isSuccess ? "hidden" : ""
                  } text-white rounded-md shadow-lg `}
                  onClick={() => setIsApply(true)}
                  disabled={checkApply}
                >
                  {checkApply ? "You applied this job" : "Apply for this job"}
                </button>
                <br />
                <br />
                {checkApply && <p>see your proposal...</p>}
              </>
            )}
            {isSuccess && (
              <button
                type="button"
                className="bg-green-500 text-white p-3 rounded-lg"
              >
                successfully send your proposal
              </button>
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
