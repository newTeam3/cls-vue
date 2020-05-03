import axios from "axios";

//分页查询班级
export const findAllClass = (params) => {
  return axios.post("/classes/findAll",params).then(res=>res);
};
//查询所有学院
export const findAllCollege = () => {
  return axios.post("/classes/findAllCollege").then(res=>res);
};
//添加班级
export const addClasses = (params) => {
  return axios.post("/classes/addClasses",params).then(res=>res);
};
//修改班级信息
export const updateClasses = (params) => {
  return axios.post("/classes/updateClasses",params).then(res=>res);
};
//停用及启用班级
export const banClasses = (params) => {
  return axios.post("/classes/banClasses",params).then(res=>res);
};
//批量禁用班级
export const banRows = (params) => {
  return axios.get("/classes/banRows",{
    params:params
  }).then(res=>res);
};
