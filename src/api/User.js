import axios from "axios";

//分页查询用户
export const findAllUser = (params) => {
  // return req("post", "/findAll", params)
  return axios.post("/user/findAllUser",params).then(res=>res);
};
export const getSearchData = () => {

  return axios.get("/user/getSearchData").then(res=>res);
};

export const addUser = (params) => {
  return axios.post("/user/addUser",params).then(res=>res);
};

export const updateUser = (params) => {
  return axios.post("/user/updateUser",params).then(res=>res);
};
export const banUser = (params) => {
  return axios.post("/user/banUser",params).then(res=>res);
};
export const banUserRows = (params) => {
  return axios.get("/user/banUserRows",{
    params:params
  }).then(res=>res);
};
export const login = (params) => {
  return axios.post("/auth",params).then(res=>res);
};
export const checkPhone = (params) => {
  return axios.get("/user/checkPhone",{
    params:params
  }).then(res=>res);
};
export const checkCode = (params) => {
  return axios.get("/sms/checkCode",{
    params:params
  }).then(res=>res);
};
export const send = (params) => {
  return axios.get("/sms/send",{
    params:params
  }).then(res=>res);
};
export const changePwd = (params) => {
  return axios.post("/user/changePwd",params).then(res=>res);
};
