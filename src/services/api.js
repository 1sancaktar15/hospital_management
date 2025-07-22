const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  // Token varsa headers'a ekle
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };

  const config = {
    headers: defaultHeaders,
    ...options,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText };
      }
      throw new Error(errorData.detail || `HTTP ${response.status}`);
    }

    if (response.status === 204) return null;
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default request;
