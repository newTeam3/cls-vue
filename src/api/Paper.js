import axios from "axios";

//分页查询用户
export const findAllPaper = (params) => {

  return axios.get("/paper/findAllPaper?page="+params).then(res=>res);

};
export const save = (params) => {

  return axios.post("/paper/save",params).then(res=>res);

};
export const findOne = (params) => {

  return axios.get("/paper/findOne?id="+params).then(res=>res);

};
export const update = (params) => {

  return axios.post("/paper/update",params).then(res=>res);

};
export const updateStatus = (id,status) => {

  return axios.post("/paper/updateStatus?id="+id + "&status=" + status).then(res=>res);

};
//模糊查询
export const findByNameOrScore = (param,param1,params) => {

  return axios.post("/paper/findByNameOrScore?page="+param+"&size="+param1,params).then(res=>res);

};
