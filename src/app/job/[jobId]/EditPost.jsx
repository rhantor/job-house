import ConfirmPage from "@/app/components/ui/ConfirmPage";
import EditJob from "@/app/components/ui/EditJob";
import React from "react";

const EditPost = ({ setIsEdit, setIsDelete, isEdit, isDelete, jobId, job }) => {
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
        onClick={() => setIsDelete(true)}
      >
        Delete Post
      </button>
      {isDelete && (
        <ConfirmPage isDelete={isDelete} setIsDelete={setIsDelete} jobId={jobId} />
      )}
      {isEdit && (
        <EditJob isEdit={isEdit} setIsEdit={setIsEdit} job={job} id={jobId} />
      )}
    </div>
  );
};

export default EditPost;
