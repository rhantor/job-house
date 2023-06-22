import { useSubmitProposalMutation } from "@/redux/features/api/job/jobsApi";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ApplyJob = ({ setIsApply, job, jobId }) => {
  const [hourlyRate, setHourlyRate] = useState(10);
  const [coverLetter, setCoverLetter] = useState("");
  const [selfDesc, setSelfDesc] = useState("");
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
      hourlyRate,
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
      </div>
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
          >
            {isLoading ? "sending..." : "Submit proposal"}
          </button>
          <button
            type="button"
            className="p-2 px-3 border-red-500 border rounded bg-red-600 text-white hover:bg-white hover:text-red-600 duration-300  text-sm md:text-base"
            onClick={() => setIsApply(false)}
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
