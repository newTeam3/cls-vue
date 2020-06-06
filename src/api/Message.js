import axios from "axios";

//分页查询问题
export const findAllDayReport = (params) => {
  return axios.post("/message/findAll",params).then(res=>res);
};

export const findEvaluateByMid = (params) => {
  return axios.get("/message/findEvaluateByMid", {
    params:params
  }).then(res=>res);
};

//回复问题
export const evaluate = (params) => {
  return axios.post("/message/evaluate",params).then(res=>res);
};

//停用及启用问题
export const banMessage = (params) => {
  return axios.post("/message/banMessage",params).then(res=>res);
};
//批量禁用问题
export const banMessageRows = (params) => {
  return axios.get("/message/banMessageRows", {
    params:params
  }).then(res=>res);
};

export const getContentAll = (params) => {
  return axios.get("/message/getContentAll", {
    params:params
  }).then(res=>res);
};
export const findAllWeekReport = (params) => {
  return axios.post("/message/findAllWeekReport",params).then(res=>res);
};

export const getEvaluateByMid = (params) => {
  return axios.get("/message/getEvaluateByMid", {
    params:params
  }).then(res=>res);
};

//回复问题
export const evaluateWeekReport = (params) => {
  return axios.post("/message/evaluateWeekReport",params).then(res=>res);
};

//停用及启用问题
export const banWeekReport = (params) => {
  return axios.post("/message/banWeekReport",params).then(res=>res);
};
//批量禁用问题
export const banWeekReportRows = (params) => {
  return axios.get("/message/banWeekReportRows", {
    params:params
  }).then(res=>res);
};

