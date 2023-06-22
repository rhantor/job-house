import ConfirmPage from "@/app/components/ui/ConfirmPage";
import EditJob from "@/app/components/ui/EditJob";
import React from "react";

const EditPost = ({ setIsEdit, setIsOpen, isEdit, isOpen, jobId, job }) => {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="p-2 px-3 border border-gray-300 rounded shadow-lg hover:bg-green-700 hover:text-white transition-all duration-300"
        onClick={() => setIsEdit(true)}
      >
        Edit Post
      </button>
      <button
        type="button"
        className="p-2 px-3 border border-gray-300 text-red-500 rounded shadow-lg hover:bg-red-700 hover:text-white transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        Delete Post
      </button>
      {isOpen && (
        <ConfirmPage isOpen={isOpen} setIsOpen={setIsOpen} jobId={jobId} />
      )}
      {isEdit && (
        <EditJob isEdit={isEdit} setIsEdit={setIsEdit} job={job} id={jobId} />
      )}
    </div>
  );
};

export default EditPost;
