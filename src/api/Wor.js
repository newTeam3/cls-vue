import axios from "axios";

//分页查询用户
export const findAllBank = (params) => {

  return axios.get("/wor/findAllWor?page="+params).then(res=>res);

};
export const save = (params) => {

  return axios.post("/wor/save",params).then(res=>res);

};
export const findOne = (params) => {

  return axios.get("/wor/findOne?id="+params).then(res=>res);

};
export const update = (params) => {

  return axios.post("/wor/update",params).then(res=>res);

};
export const updateStatus = (id,status) => {

  return axios.post("/wor/updateStatus?id="+id + "&status=" + status).then(res=>res);

};
//模糊查询
export const findQuestionOrName = (param,param1,params) => {

  return axios.post("/wor/findQuestionOrName?page="+param+"&size="+param1,params).then(res=>res);

};
