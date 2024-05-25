import axios from "axios";
import { useState, useEffect } from "react";

// Function to get a new token
const getNewToken = async () => {
  try {
    const apiUrl = process.env.REACT_APP_TEDX_API_URL;
    const access_api = process.env.REACT_APP_ACCESS_API;
    const response = await axios.get(`${apiUrl}/refreshtoken`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_api: access_api,
      },
    });
    return response.data.token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const useAxios = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Initial token fetch
    const fetchToken = async () => {
      const newToken = await getNewToken();
      setToken(newToken);
    };

    fetchToken();
  }, []);

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (!token) {
        const newToken = await getNewToken();
        setToken(newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
