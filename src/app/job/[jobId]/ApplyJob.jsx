import { useSubmitProposalMutation } from "@/redux/features/api/job/jobsApi";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const time = [
  { duration: "less than one month" },
  { duration: "one to three month" },
  { duration: "more than six months" },
];

const ApplyJob = ({ setIsApply, job, jobId, setIsSuccess }) => {
  const [hourlyRate, setHourlyRate] = useState(10);
  const [amount, setAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [selfDesc, setSelfDesc] = useState("");
  const [getPaidBy, setGetPaidBy] = useState("milestone");
  const [milestoneDesc, setMilestoneDesc] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(time[0]);
  const calcVal = hourlyRate * 0.1;
  const [submitProposal, { isLoading, isError, error }] =
    useSubmitProposalMutation();
  const { userDetails } = useSelector((state) => state.auth);
  const {
    email: freelancerEmail,
    displayName: freelancerName,
    uid: freelancerUId,
  } = userDetails;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const proposalData = {
      to_email: job?.email,
      from_email: freelancerEmail,
      from_name: freelancerName,
      subject: "Job Application",
      coverLetter,
      selfDesc,
      terms:
        getPaidBy === "project"
          ? {
              amount: hourlyRate,
              milestoneDesc: "After discussion we will decide it ",
              selectedDuration,
            }
          : { milestoneDesc, selectedDuration, amount },

      freelancer_uid: freelancerUId,
      job_id: jobId,
    };

    try {
      const resultAction = await submitProposal(proposalData);

      if (resultAction.data === "alreadySubmitted") {
        console.log("You have already submitted a proposal.");
      } else if (resultAction.error) {
        console.error("Failed to send message:", resultAction.error);
      } else {
        console.log("Message sent successfully");
        setIsApply(false);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container md:p-5  mx-auto space-y-6">
      <h1 className="font-bold text-xl mb-3 text-green-600 font-mono">
        Submit A Proposal
      </h1>
      <div className="space-y-4">
        <h1 className="font-medium text-xl">How want to be you paid ?</h1>
        <div>
          <input
            type="radio"
            name="milestone"
            id="milestone"
            value="milestone"
            checked={getPaidBy === "milestone"}
            onChange={(e) => setGetPaidBy(e.target.value)}
          />
          <label
            htmlFor="milestone"
            className="ml-3 text-base font-medium cursor-pointer"
          >
            By Milestone
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="project"
            id="project"
            value="project"
            checked={getPaidBy === "project"}
            onChange={(e) => setGetPaidBy(e.target.value)}
          />
          <label
            htmlFor="project"
            className="ml-3 text-base font-medium cursor-pointer"
          >
            By Project
          </label>
        </div>
      </div>
      {getPaidBy === "project" && (
        <div className="border rounded-md border-gray-500 p-2 sm:p-5 space-y-5">
          <h1 className="text-2xl font-semibold text-black mb-3 ">Terms</h1>
          <div className="flex justify-between items-center border-b border-gray-300 rounded pb-5  ">
            <label
              htmlFor="hourly-rate"
              className="font-semibold text-gray-700 text-xs  sm:text-sm basis-[50%] sm:basis-[33%]"
            >
              Your Hourly Rate
            </label>
            <div className="border-gray-500  border-dashed border-t mt-4 basis-[33%] hidden sm:block"></div>
            <div className="text-right basis-1/2 sm:basis-[33%]">
              <input
                type="number"
                name="hourlyrate"
                id="hourly-rate"
                className="border border-gray-500 outline-none p-1 rounded-md text-right w-[70%]"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />{" "}
              <span className="text-gray-600">/hr</span>
            </div>
          </div>

          <div className="flex justify-between border-b border-gray-300 rounded pb-5 items-center ">
            <label
              htmlFor="hourly-rate"
              className="font-semibold text-gray-700 text-xs sm:text-sm"
            >
              10% freelancer service fee
            </label>
            <div className="border-gray-500  border-dashed border-t basis-[20%] sm:mt-4 sm:basis-[33%]"></div>
            <p className="font-semibold ">
              {calcVal}
              <span className="text-sm font-normal">/hr</span>
            </p>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 rounded pb-5 ">
            <label
              htmlFor="hourly-rate"
              className="font-semibold text-gray-700 text-xs sm:text-sm basis-1/2 sm:basis-[33%]"
            >
              Your will get
            </label>
            <div className="border-gray-500  border-dashed border-t mt-4 basis-[33%] hidden sm:block"></div>
            <div className="basis-1/2 sm:basis-[33%] text-right">
              <input
                type="text"
                name="hourlyrate"
                id="hourly-rate"
                className="border border-gray-500 outline-none p-1 pr-4 rounded-md text-right w-[70%]"
                value={(hourlyRate - calcVal).toFixed(2)}
                onChange={(e) => setHourlyRate(e.target.value)}
              />{" "}
              <span className="text-gray-600">/hr</span>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="duration" className="font-medium block ">
              Duration
            </label>
            <Listbox value={selectedDuration} onChange={setSelectedDuration}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full border border-orange-300 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {selectedDuration.duration}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    ✓
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {time.map((duration, duIndx) => (
                      <Listbox.Option
                        key={duIndx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={duration}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {duration.duration}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 text-xl">
                                ✓
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      )}
      {getPaidBy === "milestone" && (
        <div className="border rounded-md border-gray-500 p-2 sm:p-5 space-y-5">
          <h1 className="text-2xl font-semibold text-black mb-3 ">Terms</h1>
          <div>
            <label htmlFor="milestoneDesc" className="font-medium mb-2 block ">
              Milestone description
            </label>
            <input
              required
              type="text"
              name="milestoneDesc"
              id="milestoneDesc"
              placeholder="set your milestone description"
              value={milestoneDesc}
              onChange={(e) => setMilestoneDesc(e.target.value)}
              className="border border-gray-500 outline-none rounded-md p-2 w-[80%] text-sm"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-5 justify-start items-center">
            <div className="w-full sm:w-1/2">
              <label htmlFor="duration" className="font-medium block ">
                Duration
              </label>
              <Listbox value={selectedDuration} onChange={setSelectedDuration}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full border border-orange-300 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedDuration.duration}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      ✓
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {time.map((duration, duIndx) => (
                        <Listbox.Option
                          key={duIndx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={duration}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {duration.duration}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 text-xl">
                                  ✓
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="w-full sm:w-1/3">
              <label htmlFor="amount" className="font-medium block capitalize">
                set amount
              </label>
              <input
                required
                type="number"
                name="amount"
                id="amount"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border focus:border-orange-300 border-gray-500 outline-none rounded-md p-2 w-[80%] text-sm"
              />
            </div>
          </div>
        </div>
      )}
      <form
        className="border rounded-md border-gray-500 p-5 space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-black mb-3 ">
          Additional requirements
        </h1>
        <div>
          <label
            htmlFor="coverLetter"
            className="mb-3 block capitalize font-semibold text-gray-600"
          >
            Cover letter
          </label>
          <textarea
            name="coverLetter"
            id="coverLetter"
            rows="5"
            className="border border-gray-500 w-full rounded p-3 outline-none"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="coverLetter"
            className="mb-3 block capitalize font-semibold text-gray-600"
          >
            Describe your recent experience with similar projects
          </label>
          <textarea
            name="coverLetter"
            id="coverLetter"
            // cols="30"
            rows="5"
            className="border border-gray-500 w-full rounded p-3 outline-none"
            value={selfDesc}
            onChange={(e) => setSelfDesc(e.target.value)}
          ></textarea>
        </div>
        <div className=" space-x-2 sm:space-x-5">
          <button
            type="submit"
            className="p-2 px-3 border-green-500 border rounded bg-green-600 text-white hover:bg-green-800 duration-300 text-sm md:text-base "
            disabled={isLoading}
          >
            {isLoading ? "sending..." : "Submit proposal"}
          </button>
          <button
            type="button"
            className="p-2 px-3 border-red-500 border rounded bg-red-600 text-white hover:bg-white hover:text-red-600 duration-300  text-sm md:text-base"
            onClick={() => setIsApply(false)}
            disabled={isLoading}
          >
            {" "}
            Cancel
          </button>
        </div>
        <div>{isError && error.toString()}</div>
      </form>
    </div>
  );
};

export default ApplyJob;
