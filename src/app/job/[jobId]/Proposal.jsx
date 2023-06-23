import { timeStamp } from "@/app/components/timestamp";
import { useFetchJobsProposalsQuery } from "@/redux/features/api/job/jobsApi";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Proposal = ({ showProposal, setShowProposal, jobId }) => {
  const { userDetails } = useSelector((state) => state?.auth);
  const { uid } = userDetails || {};
  const {
    data: proposalData,
    isLoading,
    isError,
    error,
  } = useFetchJobsProposalsQuery({
    jobId,
    uid,
  });

  const { hourlyRate, coverLetter, timestamp, selfDesc } = proposalData || {};

  return (
    <>
      <Transition appear show={showProposal || true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowProposal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex border border-red-500 min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className={"w-full flex items-center justify-center"}
              >
                {isLoading ? (
                  <span className="text-white">loading...</span>
                ) : isError ? (
                  error.toString()
                ) : (
                  <Dialog.Panel className="w-full sm:min-w-[600px] max-w-3xl transform max-h-[80vh] overflow-auto scrollbar-container rounded-xl rounded-r-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex justify-between items-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-green-600"
                      >
                        Your Proposal
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-red-500 font-serif outline-none"
                        onClick={() => setShowProposal(false)}
                      >
                        ❌
                      </button>
                    </div>
                    <div className="space-y-4 mt-3">
                      <div className="flex justify-start items-start gap-3">
                        <h1 className="font-mono basis-1/5">Cover Letter :</h1>
                        <p className="text-base text-gray-500 basis-[75%]">
                          {coverLetter} 
                        </p>
                      </div>
                      <div className="flex justify-start items-start gap-3">
                        <h1 className="font-mono basis-1/5">Recent Work :</h1>
                        <p className="text-base text-gray-500 basis-[75%]">
                          {selfDesc}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-5">
                        <h1 className="font-mono basis-1/5">Your Rate:</h1>
                        <p className="text-base text-gray-900 font-bold">
                          $ {hourlyRate}
                        </p>
                      </div>
                      <h1 className="text-sm">
                        submited &nbsp;
                        <span className="font-medium">
                          {timeStamp(timestamp)}
                        </span>
                      </h1>
                    </div>

                    <div className="mt-4 space-x-5"></div>
                    {isError && <h3 className="text-red-600">{error}</h3>}
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Proposal;
