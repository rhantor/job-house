import { timeStamp } from "@/app/components/timestamp";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const ShowProposal = ({ proposal, showModal, setShowModal }) => {
  const { coverLetter, selfDesc, terms, timestamp } = proposal || {};
  const { amount, selectedDuration, milestoneDesc } = terms || {};
  return (
    <>
      <Transition appear show={showModal || true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowModal(false)}
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
                      onClick={() => setShowModal(false)}
                    >
                      ❌
                    </button>
                  </div>
                  <div className="space-y-4 mt-3">
                    <div className="flex flex-wrap justify-start items-start sm:gap-3 ">
                      <h1 className="font-mono basis-full sm:basis-1/4">
                        Cover Letter :
                      </h1>
                      <p className="text-base text-gray-500 basis-full sm:basis-[70%]">
                        {coverLetter}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-start items-start sm:gap-3">
                      <h1 className="font-mono basis-full sm:basis-1/4">
                        Recent Work :
                      </h1>
                      <p className="text-base text-gray-500 basis-full sm:basis-[70%]">
                        {selfDesc}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-start sm:gap-3">
                      <h1 className="font-mono basis-1/2 sm:basis-1/4">
                        Your Rate:
                      </h1>
                      <p className="text-base text-gray-900 font-bold">
                        $ {amount}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-start sm:gap-3">
                      <h1 className="font-mono basis-full sm:basis-1/4">
                        Duration :
                      </h1>
                      <p className="text-base text-gray-900 font-bold ">
                        {selectedDuration?.duration}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-start sm:gap-3">
                      <h1 className="font-mono basis-full sm:basis-1/4">
                        milestone desc :
                      </h1>
                      <p className="text-base text-gray-900 font-bold basis-full sm:basis-[70%]">
                        {milestoneDesc}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShowProposal;
