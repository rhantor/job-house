"use client";

import React, { Fragment, useEffect } from "react";
import { useDeleteJobMutation } from "@/redux/features/api/job/jobsApi";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

const ConfirmPage = ({ isOpen = false, setIsOpen, jobId }) => {
  const [deleteJob, { isLoading, isError, error, isSuccess }] =
    useDeleteJobMutation();
  const router = useRouter();
  const handleDeleteJob = async (id) => {
    await deleteJob(id);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      router.replace("/job");
    }
  }, [isSuccess, setIsOpen, router]);
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-red-600"
                  >
                    Delete Item
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      Are you sure to delete this item ?
                    </p>
                  </div>

                  <div className="mt-4 space-x-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border duration-300 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-white  hover:text-red-500 focus:outline-none focus-visible:ring-2 shadow-lg hover:border-red-500 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleDeleteJob(jobId)}
                    >
                      {isLoading ? "deleting.." : "Yes"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg duration"
                      onClick={() => setIsOpen(false)}
                    >
                      No
                    </button>
                  </div>
                  {isError && <h3 className="text-red-600">{error}</h3>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ConfirmPage;
