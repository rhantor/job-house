"use client";

import {
  useUpdateJobMutation,
} from "@/redux/features/api/job/jobsApi";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

const EditJob = ({ isEdit = false, setIsEdit, job, id }) => {
  const [title, setTitle] = useState(job.title);
  const [desc, setDesc] = useState(job.desc);
  const [price, setPrice] = useState(job.price);
  const [expLvl, setExpLvl] = useState(job.expLvl);
  const [updateJob, { isLoading, isSuccess, isError, error }] =
    useUpdateJobMutation();

  const handleSubmitData = async (event) => {
    event.preventDefault();
    const data = {
      title,
      desc,
      price,
      expLvl,
    };
    await updateJob({ id, data });
  };
  useEffect(() => {
    if (isSuccess) {
      setDesc("");
      setPrice("");
      setTitle("");
      setIsEdit(false);
    }
    console.log("landed");
  }, [isSuccess, setIsEdit, error, isError]);
  return (
    <Transition appear show={isEdit} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEdit(false)}
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-green-600"
                >
                  Edit Item
                </Dialog.Title>
                <form onSubmit={handleSubmitData} className="m-auto max-w-2xl">
                  <div className="mb-4">
                    <label
                      htmlFor="jobTitle"
                      className="mb-2 text-lg block font-semibold"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      id="jobTitle"
                      className="outline-none border border-gray-400 py-1 px-4 rounded-lg text-sm w-[90%]"
                      placeholder="job title within 50 letter"
                      maxLength={50}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <sub className="text-xs text-gray-400 ml-2">
                      {50 - title.length} / 50
                    </sub>
                  </div>
                  <div>
                    <label
                      htmlFor="desc"
                      className="mb-2 text-lg block font-semibold"
                    >
                      Description
                    </label>
                    <textarea
                      rows={6}
                      type="text"
                      name="desc"
                      id="desc"
                      className="outline-none border border-gray-400 py-1 px-4 rounded-lg text-sm w-[90%]"
                      placeholder="job description within 500 letter"
                      maxLength={500}
                      onChange={(e) => setDesc(e.target.value)}
                      value={desc}
                    />
                    <sub className="text-xs text-gray-400 ml-2">
                      {500 - desc.length} / 500
                    </sub>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="mb-2 text-lg block font-semibold"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="title"
                      id="title"
                      className="outline-none border border-gray-400 py-1 px-4 rounded-lg text-sm "
                      placeholder="1000$"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                  <div className="mb-5 space-x-2 space-y-4">
                    <h2 className="font-semibold">Experience Level</h2>
                    <input
                      type="radio"
                      name="radio"
                      id="entry"
                      placeholder="entry"
                      value="entry"
                      checked={expLvl === "entry"}
                      onChange={(e) => setExpLvl(e.target.value)}
                      required
                    />
                    <label htmlFor="entry" className="mr-2sm:mr-5">
                      Entry
                    </label>

                    <input
                      type="radio"
                      name="radio"
                      id="intermediate"
                      placeholder="intermediate"
                      value="intermediate"
                      checked={expLvl === "intermediate"}
                      onChange={(e) => setExpLvl(e.target.value)}
                    />
                    <label htmlFor="intermediate" className="mr-2sm:mr-5">
                      {" "}
                      Intermediate
                    </label>
                    <input
                      type="radio"
                      name="radio"
                      id="expert"
                      placeholder="expert"
                      value="expert"
                      checked={expLvl === "expert"}
                      onChange={(e) => setExpLvl(e.target.value)}
                    />
                    <label htmlFor="expert"> Expert </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="mr-3 p-2 px-3 bg-green-600 text-white rounded"
                      disabled={isLoading}
                    >
                      {isLoading ? " updating..." : "update"}
                    </button>
                    {price.length > 0 || title.length > 0 || desc.length > 0 ? (
                      <button
                        className="bg-black text-white p-2 px-3 rounded"
                        type="button"
                        onClick={() => setIsEdit(false)}
                      >
                        {" "}
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </form>
                {isError && <h3 className="text-red-600">{error?.message}</h3>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditJob;
