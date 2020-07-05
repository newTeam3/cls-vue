import axios from "axios";
//分页查询角色
export const findAllRoles = (params) => {
  return axios.post("/role/findAllRoles",params).then(res=>res);
};
//添加角色
export const addRole = (params) => {
  return axios.post("/role/addRole",params).then(res=>res);
};
export const updateRole = (params) => {
  return axios.post("/role/updateRole",params).then(res=>res);
};
