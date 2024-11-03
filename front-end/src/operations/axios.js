import axios from "axios";

const url = "http://localhost:3000/api/users";

export async function CreateUsers(info) {
  const response = await axios.post(url, info, {
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  });
  return response.data;
}
export async function loginUser(info) {
  const response = await axios.post(`${url}/authenticate`, info, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
}
export async function getMe(token) {
  const response = await axios.get(`${url}/me`, {
    headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json" 
     },
    withCredentials: false,
  });
  return response.data.data; 
}
export async function updateMe(token, info) {
  const response = await axios.patch(`${url}/patch`, info, {
    headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
  },
  withCredentials: false})
  return response.data.data;
}
const API_KEY ="c5f1c936ffde15474bbeea3949a1ef0f";
export async function getMovies() {
const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY} ` )
console.log(response.data.results);
return response.data.results
}


