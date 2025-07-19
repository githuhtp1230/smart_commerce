import {
  differenceInSeconds,
  differenceInDays,
  intervalToDuration,
  format,
} from "date-fns";

export function getTimeRemaining(inputTimeStr: string): string | null {
  const now = new Date();
  const inputTime = new Date(inputTimeStr);

  if (inputTime <= now) {
    return null;
  }

  const diffDays = differenceInDays(inputTime, now);

  if (diffDays == 1) {
    return `${diffDays} day`;
  } else if (diffDays > 1) {
    return `${diffDays} days`;
  } else {
    const duration = intervalToDuration({ start: now, end: inputTime });
    const hh = String(duration.hours).padStart(2, "0");
    const mm = String(duration.minutes).padStart(2, "0");
    const ss = String(duration.seconds).padStart(2, "0");

    return `${hh}:${mm}:${ss} hours`;
  }
}
