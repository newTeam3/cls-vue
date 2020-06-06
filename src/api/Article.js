import axios from "axios";

export const addArticle = (params) => {
  return axios.post("/article/addArticle",params).then(res=>res);
};

export const getArticle = (params) => {
  return axios.get("/article/getArticle",{
    params:params
  }).then(res=>res);
};

export const getComments = (params) => {
  return axios.get("/article/getComments",{
    params:params
  }).then(res=>res);
};

export const addComments = (params) => {
  return axios.post("/article/addComments",params).then(res=>res);
};

export const addReply = (params) => {
  return axios.post("/article/addReply",params).then(res=>res);
};

//========================================================================
export const getSort = () => {
  return axios.get("/article/getSort").then(res=>res);
};

export const findAllArticle = (params) => {
  return axios.post("/article/findAllArticle",params).then(res=>res);
};
//添加分类
//修改分类信息
export const updateArticle = (params) => {
  return axios.post("/article/updateArticle",params).then(res=>res);
};
//停用及启用分类
export const banArticle = (params) => {
  return axios.post("/article/banArticle",params).then(res=>res);
};
//批量禁用分类
export const banArticleRows = (params) => {
  return axios.get("/article/banArticleRows",{
    params:params
  }).then(res=>res);
};
//===================================================================================
//查询所有分类
export const findAllSort = (params) => {
  return axios.post("/article/findAllSort",params).then(res=>res);
};
//添加分类
export const addSort = (params) => {
  return axios.post("/article/addSort",params).then(res=>res);
};
//修改分类信息
export const updateSort = (params) => {
  return axios.post("/article/updateSort",params).then(res=>res);
};
//停用及启用分类
export const banSort = (params) => {
  return axios.post("/article/banSort",params).then(res=>res);
};
//批量禁用分类
export const banSortRows = (params) => {
  return axios.get("/article/banSortRows",{
    params:params
  }).then(res=>res);
};
