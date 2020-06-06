import axios from "axios";

//分页查询职务
export const findAllNotice = (params) => {
  return axios.post("/task/findAll",params).then(res=>res);
};
//添加职务
export const addNotice = (params) => {
  return axios.post("/task/addNotice",params).then(res=>res);
};
//修改职务信息
export const updateNotice = (params) => {
  return axios.post("/task/updateNotice",params).then(res=>res);
};
//停用及启用职务
export const banNotice = (params) => {
  return axios.post("/task/banNotice",params).then(res=>res);
};
//批量禁用职务
export const banRows = (params) => {
  return axios.get("/task/banRows", {
    params:params
  }).then(res=>res);
};

export const findAllTask = (params) => {
  return axios.post("/task/findAllTask",params).then(res=>res);
};
//添加职务
export const addTask = (params) => {
  return axios.post("/task/addTask",params).then(res=>res);
};
//修改职务信息
export const updateTask = (params) => {
  return axios.post("/task/updateTask",params).then(res=>res);
};
//停用及启用职务
export const banTask = (params) => {
  return axios.post("/task/banTask",params).then(res=>res);
};
//批量禁用职务
export const banTaskRows = (params) => {
  return axios.get("/task/banTaskRows", {
    params:params
  }).then(res=>res);
};
export const findCommitData = (params) => {
  return axios.get("/task/findCommitData", {
    params:params
  }).then(res=>res);
};
