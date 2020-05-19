import axios from "axios";

//分页查询问题
export const findAllQuestion = (params) => {
  return axios.post("/question/findAll",params).then(res=>res);
};
//回复问题
export const reply = (params) => {
  return axios.post("/question/reply",params).then(res=>res);
};
//根据qid查询answer
export const findAnswerByQid = (params) => {
  return axios.get("/question/findAnswerByQid", {
    params:params
  }).then(res=>res);
};
//停用及启用问题
export const banQuestion = (params) => {
  return axios.post("/question/banQuestion",params).then(res=>res);
};
//批量禁用问题
export const banRows = (params) => {
  return axios.get("/question/banRows", {
    params:params
  }).then(res=>res);
};
//分页查询回答
export const findAllAnswer = (params) => {
  return axios.post("/question/findAllAnswer",params).then(res=>res);
};
//停用及启用回答
export const banAnswer = (params) => {
  return axios.post("/question/banAnswer",params).then(res=>res);
};
//批量禁用回答
export const banAnswerRows = (params) => {
  return axios.get("/question/banAnswerRows", {
    params:params
  }).then(res=>res);
};
