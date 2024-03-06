import axios from "axios";

const URL = "http://localhost:3001";

const API = axios.create({
  baseURL: URL,
});

const setAuthorizationHeader = () => {
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    API.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  }
};

export const login = async (credentials, clientId) => {
  setAuthorizationHeader();
  return await API.post("/login", {
    cred: credentials,
    id: clientId,
  });
};

export const auth = async () => {
  setAuthorizationHeader();
  return await API.get("/auth");
};

export const addData = async (data) => {
  setAuthorizationHeader();
  return await API.post("/add", { data });
};

export const fetchData = async () => {
  setAuthorizationHeader();
  return await API.get("/fetch");
};

export const deleteData = async (id) => {
  setAuthorizationHeader();
  return await API.delete(`/delete/${id}`);
};

export const editData = async (data) => {
  setAuthorizationHeader();
  return await API.patch("/edit", { data });
};