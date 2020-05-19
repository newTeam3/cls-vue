import axios from "axios";

//分页查询学院
export const findAllGroup = (params) => {
  return axios.post("/group/findAll",params).then(res=>res);
};
//添加学院
export const addGroup = (params) => {
  return axios.post("/group/addGroup",params).then(res=>res);
};
//修改学院信息
export const updateGroup = (params) => {
  return axios.post("/group/updateGroup",params).then(res=>res);
};
//停用及启用学院
export const banGroup = (params) => {
  return axios.post("/group/banGroup",params).then(res=>res);
};
//批量禁用学院
export const banRows = (params) => {
  return axios.get("/group/banRows", {
    params:params
  }).then(res=>res);
};
