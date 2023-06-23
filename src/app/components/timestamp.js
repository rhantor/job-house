export const timeStamp = (time = {}) => {
  const createdTime = time.seconds * 1000 + Math.floor(time.nanoseconds / 1e6);
  const currentTime = Date.now();
  const timeDifference = currentTime - createdTime;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let formattedTimeDifference = "";

  if (years > 0) {
    formattedTimeDifference = `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    formattedTimeDifference = `${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 0) {
    formattedTimeDifference = `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    formattedTimeDifference = `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    formattedTimeDifference = `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  formattedTimeDifference += " ago";
  return formattedTimeDifference;
};
