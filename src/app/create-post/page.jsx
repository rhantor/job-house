"use client";

import { useAddJobMutation } from "@/redux/features/api/job/jobsApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [expLvl, setExpLvl] = useState("entry-level");
  const [addJob, { isLoading, isSuccess, isError }] = useAddJobMutation();
  const { userDetails = {} } = useSelector((state) => state.auth);
  const { uid, role, email } = userDetails || localStorage?.getItem("userData");
  const router = useRouter();

  const handleSubmitData = async (event) => {
    event.preventDefault();
    const data = {
      title,
      desc,
      price,
      uid,
      expLvl,
      email,
    };
    if (title && desc && price) {
      await addJob(data);
    }
    // isLoading
  };
  useEffect(() => {
    if (isSuccess) {
      setDesc("");
      setPrice("");
      setTitle("");
      router.push("/job");
    }
    if (role !== "client") {
      router.replace("/");
    }
  }, [isSuccess, router, role]);

  return (
    <div className="container p-5">
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
            className="outline-none border border-gray-400 py-1 px-4 rounded-lg text-sm w-[80%] sm:w-[90%]"
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
          <label htmlFor="desc" className="mb-2 text-lg block font-semibold">
            Description
          </label>
          <textarea
            rows={5}
            type="text"
            name="desc"
            id="desc"
            className="outline-none border border-gray-400 py-1 px-4 rounded-lg text-sm w-[80%] sm:w-[90%]"
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
          <label htmlFor="title" className="mb-2 text-lg block font-semibold">
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
          >
            {isLoading ? " adding..." : "Submit"}
          </button>
          {price.length > 0 || title.length > 0 || desc.length > 0 ? (
            <button
              className="bg-black text-white p-2 px-3 rounded"
              type="button"
              onClick={() => {
                setDesc("");
                setPrice("");
                setTitle("");
              }}
            >
              {" "}
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
