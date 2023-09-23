export function relativeTime(timestamp) {
  const date = new Date(timestamp);
  const currentDate = new Date();

  // convert milli-seconds into seconds
  const secondsDifference = Math.floor((currentDate - date) / 1000);
  if (secondsDifference < 60) {
    return `${secondsDifference} ${
      secondsDifference === 1 ? "second" : "seconds"
    } ago`;
  }

  // convert seconds into minutes
  const minutesDifference = Math.floor(secondsDifference / 60);
  if (minutesDifference < 60) {
    return `${minutesDifference} ${
      minutesDifference === 1 ? "minute" : "minutes"
    } ago`;
  }

  const hoursDifference = Math.floor(minutesDifference / 60);
  if (hoursDifference < 24) {
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
  }

  const daysDifference = Math.floor(hoursDifference / 24);
  if (daysDifference < 30) {
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }

  const monthsDifference = Math.floor(daysDifference / 30);
  if (monthsDifference < 12) {
    return `${monthsDifference} ${
      monthsDifference === 1 ? "month" : "months"
    } ago`;
  }

  const yearsDifference = Math.floor(monthsDifference / 12);
  return `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"} ago`;
}
