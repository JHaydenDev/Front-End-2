import axios from "axios";

export const axiosWithAuth = () => {
  // adds reference to localstorage key called token
  const token = localStorage.getItem("token");
  // return a new instance of axios
  return axios.create({
    baseURL: "https://bw-guess-who.herokuapp.com",
    headers: {
      Authorization: token
    }
  });
};