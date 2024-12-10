/**
 * Format large numbers into readable units (T/B/M)
 * @param {number} supply - Number to format
 * @returns {string} Formatted number with unit
 */
export const formatSupply = (supply) => {
  if (!supply) return "0";
  const num = Number(supply);
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return num.toLocaleString();
};

/**
 * Format namespace ID for display
 * @param {string} id - Namespace ID
 * @returns {string} Formatted ID
 */
export const formatNamespaceId = (id) => {
  return `NS-${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
};

/**
 * Format time to relative string
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

/**
 * Format date to locale string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
