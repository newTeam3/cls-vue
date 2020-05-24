import axios from "axios";

//分页查询用户
export const findAllBank = (params) => {

  return axios.get("/bank/findAllBank?page="+params).then(res=>res);

};
//删除
export const deleteById = (params) => {

  return axios.get("/bank/delete?id="+params).then(res=>res);

};
export const findOne = (params) => {

  return axios.get("/bank/findOne?id="+params).then(res=>res);

};
export const update = (params) => {

  return axios.post("/bank/update",params).then(res=>res);

};
export const save = (params) => {

  return axios.post("/bank/save",params).then(res=>res);

};
export const updateStatus = (id,status) => {

  return axios.post("/bank/updateStatus?id="+id + "&status=" + status).then(res=>res);

};
//模糊查询
export const findNameOrCount = (param,param1,params) => {

  return axios.post("/bank/findNameOrCount?page="+param+"&size="+param1,params).then(res=>res);

};
