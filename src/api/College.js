import axios from "axios";

//分页查询学院
export const findAllCollege = (params) => {
  return axios.post("/college/findAll",params).then(res=>res);
};
//添加学院
export const addCollege = (params) => {
  return axios.post("/college/addCollege",params).then(res=>res);
};
//修改学院信息
export const updateCollege = (params) => {
  return axios.post("/college/updateCollege",params).then(res=>res);
};
//停用及启用学院
export const banCollege = (params) => {
  return axios.post("/college/banCollege",params).then(res=>res);
};
//批量禁用学院
export const banRows = (params) => {
  return axios.get("/college/banRows", {
    params:params
  }).then(res=>res);
};
