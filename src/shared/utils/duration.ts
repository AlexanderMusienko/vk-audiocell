export const formatDuration = (duration: number) => {
  if (isNaN(duration)) {
    console.error("Invalid song duration", duration);
    return "00:00";
  }

  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
};
