import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (date: Date | string) => {
  const timeZone = "America/Argentina/Buenos_Aires";

  if (typeof date === "string") {
    const formattedDate = dayjs(date)
      .utc()
      .tz(timeZone)
      .add(3, "hours")
      .format("DD [de] MMMM [de] YYYY");
    return formattedDate;
  } else {
    const formattedDate = dayjs(date)
      .utc()
      .tz(timeZone)
      .add(3, "hours")
      .format("DD [de] MMMM [de] YYYY");
    return formattedDate;
  }
};

export default formatDate;
