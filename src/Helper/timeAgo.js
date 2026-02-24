// src/components/Helper/timeAgo.js
export function timeAgo2(dateString) {
  const date = new Date(dateString); // ❌ jangan tambah offset manual lagi

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const safeDiff = diffInSeconds < 0 ? 0 : diffInSeconds;
  const days = Math.floor(safeDiff / (3600 * 24));
  const hours = Math.floor((safeDiff % (3600 * 24)) / 3600);
  const minutes = Math.floor((safeDiff % 3600) / 60);

  if (days > 0) {
    return `${days} Days Ago`;
  } else if (hours > 0) {
    return `${hours} Hours Ago`;
  } else if (minutes > 0) {
    return `${minutes} Minutes Ago`;
  } else {
    return "Just Now";
  }
}

// src/components/Helper/timeAgo2.js
export function timeAgo(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.warn("Invalid date:", dateString);
    return "-";
  }

  const now = new Date();
  const diffMs = now - date;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} tahun yang lalu`;
  if (months > 0) return `${months} bulan yang lalu`;
  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  return "Baru saja";
}
