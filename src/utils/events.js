// utils/fetchData.js

import axios from "axios";

const fetchDataEvents = async (setData, setLoading, setError) => {
  setLoading(true);
  try {
    const apiUrl = process.env.REACT_APP_TEDX_API_URL;
    const access_api = process.env.REACT_APP_ACCESS_API;
    const response = await axios.get(`${apiUrl}/events?sort=desc`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_api: access_api,
      },
    });
    setData(response.data.data);
    setLoading(false);
  } catch (error) {
    setError("Error fetching posts");
    setLoading(false);
  }
};

export default fetchDataEvents;
