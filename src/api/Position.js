import axios from "axios";

//分页查询职务
export const findAllPosition = (params) => {
  return axios.post("/position/findAll",params).then(res=>res);
};
//添加职务
export const addPosition = (params) => {
  return axios.post("/position/addPosition",params).then(res=>res);
};
//修改职务信息
export const updatePosition = (params) => {
  return axios.post("/position/updatePosition",params).then(res=>res);
};
//停用及启用职务
export const banPosition = (params) => {
  return axios.post("/position/banPosition",params).then(res=>res);
};
//批量禁用职务
export const banRows = (params) => {
  return axios.get("/position/banRows", {
    params:params
  }).then(res=>res);
};
