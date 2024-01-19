import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const Token  = process.env.REACT_APP_TOKEN
const headers = {
  Authorization: "Bearer " + Token,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
};
