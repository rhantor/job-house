"use client";

import {
  useFetchJobQuery,
  useFetchProposalForClientQuery,
} from "@/redux/features/api/job/jobsApi";
import React, { useState } from "react";
import ShowProposal from "./ShowProposal";
import Loading from "@/app/components/Loading";

const DynamicComponent = ({ params }) => {
  const { proposalId: jobId } = params;
  const [showModal, setShowModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState({});

  const {
    data: proposalsData,
    isLoading,
    isError,
    error,
  } = useFetchProposalForClientQuery(jobId);
  const { data: job } = useFetchJobQuery(jobId);
  const { title } = job || {};

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  };
  return (
    <div className="container p-5 mx-auto">
      <div>
        <h1 className="text-2xl font-semibold font-mono text-gray-600 mb-4">
          Your {`{${title || "demo"}}`} Job received{" "}
          {proposalsData?.length || 0} proposal{" "}
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
          error.toString()
        ) : (
          proposalsData && (
            <ul className="space-y-3 max-w-3xl mx-auto">
              {proposalsData?.map((proposal, index) => (
                <li
                  key={index}
                  className="space-y-1 shadow-lg p-3 border border-gray-300 rounded-md list-decimal cursor-pointer"
                  onClick={() => handleProposalClick(proposal)}
                >
                  <h1 className="text-lg ">
                    You got proposal from{" "}
                    <span className="capitalize font-medium">
                      {proposal.from_name}
                    </span>
                  </h1>
                  <p>
                    {proposal.coverLetter.length > 100 ? (
                      <>
                        {proposal.coverLetter.slice(0, 99)} &nbsp;
                        <button type="button" className="text-green-600">
                          See job...
                        </button>
                      </>
                    ) : (
                      proposal.coverLetter
                    )}
                  </p>
                  <p>
                    Duration :{" "}
                    <span className="font-medium">
                      {proposal.terms.selectedDuration.duration}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )
        )}
        {showModal && (
          <ShowProposal
            proposal={selectedProposal}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default DynamicComponent;
