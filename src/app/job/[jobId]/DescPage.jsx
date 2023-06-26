import React from "react";

const DescPage = (props) => {
  const {
    desc,
    price,
    expLvl,
    title,
    timestamp,
    update,
    updatedTime,
    userDetails,
  } = props;
  const updatedLocalTime = updatedTime?.toDate().toLocaleString();
  const createdLocalTime = timestamp?.toDate().toLocaleString();
  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="font-mono capitalize text-2xl md:text-3xl">{title}</h1>
        <div>
          <h2 className="text-xs md:text-sm">
            {" "}
            created At - {createdLocalTime}
          </h2>
          {update && userDetails.role === "client" && (
            <h3 className="text-xs md:text-sm">
              updated at - {updatedLocalTime}
            </h3>
          )}
        </div>
      </div>
      <p className="text-base text-[#313131]">{desc}</p>
      <ul>
        <li>Budget - $ {price}</li>
        <li>Exp Level - {expLvl || "Entry Level"}</li>
      </ul>
    </>
  );
};

export default DescPage;
