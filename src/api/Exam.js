//分页查询用户
import axios from "axios";

export const findAllExam = (params) => {

  return axios.get("/exam/findAllExam?page="+params).then(res=>res);

};
export const save = (params) => {

  return axios.post("/exam/save",params).then(res=>res);

};
export const findOne = (params) => {

  return axios.get("/exam/findOne?id="+params).then(res=>res);

};
export const update = (params) => {

  return axios.post("/exam/update",params).then(res=>res);

};
export const updateStatus = (id,status) => {

  return axios.post("/exam/updateStatus?id="+id + "&status=" + status).then(res=>res);

};
//模糊查询
export const findByNameOrScore = (param,params) => {

  return axios.post("/exam/findByNameOrScore?page="+param,params).then(res=>res);

};
