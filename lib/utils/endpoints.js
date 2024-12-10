export const API_BASE = "https://api-mainnet.celenium.io/v1";

export const ENDPOINTS = {
  HEAD: `${API_BASE}/head`,
  BLOCK_COUNT: `${API_BASE}/block/count`,
  ADDRESS_COUNT: `${API_BASE}/address/count`,
  GAS_PRICE: `${API_BASE}/gas/price`,
  CONSTANTS: `${API_BASE}/constants`,
  NAMESPACES: `${API_BASE}/namespace`,
  ACTIVE_NAMESPACES: `${API_BASE}/namespace/active`,
  SEARCH: `${API_BASE}/search`,
  GAS_ESTIMATE: `${API_BASE}/gas/estimate_for_pfb`,
};
