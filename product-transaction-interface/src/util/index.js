export function formatDate(date) {
  // Get day, month, year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Get hours, minutes, seconds
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format as dd/mm/yyyy : hh:mm:ss
  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}

export function formatMilliseconds(millis) {
  let hours = Math.floor(millis / (1000 * 60 * 60));
  let minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((millis % (1000 * 60)) / 1000);

  // Format hours, minutes, and seconds to ensure two digits (e.g., 01:05:09)
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function formatNumberWithDots(number) {
  return number?.toLocaleString("en-US").replace(/,/g, ".");
}

export function formatDateTypeArray(date) {
  return date ? `${date[1]}/${date[2]}/${date[0]}` : undefined;
}
