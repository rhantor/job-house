import React from "react";

const Loading = () => {
  return (
    <div className="border shadow-lg  border-slate-3 rounded 00 max-w-[600px] h-32 p-2 flex flex-col gap-2 my-5 animate-pulse">
      <div className="flex-1 space-y-5 py-1">
        <div className="h-2 w-1/2 bg-slate-400 rounded"></div>
        <div className="space-y-5">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
        <div className="h-2 w-10/12 bg-slate-400 rounded"></div>
      </div>
    </div>
  );
};

export default Loading;
