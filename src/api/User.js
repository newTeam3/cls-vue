import axios from "axios";

export const login = (params) => {
  return axios.post("/login",params).then(res=>res.data);
}
//分页查询用户
export const findAllUser = (params) => {
  // return req("post", "/findAll", params)
  return axios.post("/findAll",params).then(res=>res.data);
};
//单个用户禁用及启用
export const deleteUser = (params) => {

  return axios.get("/deleteUser",{
    params: params
  }).then(res=>res.data);
};
//批量禁用用户
export const deleteRow = (params) => {
  console.log("这是deleterow的"+ params)
  return axios.get("/deleteAll",{
    params:params
  }).then(res=>res.data)
};
//编辑修改用户
export const editUser = (params) => {
  console.log("这是edituser的"+ params)
  return axios.get("/updateUser",{
    params: params
  }).then(res=>res.data);
};
//新增用户
export const addUser = (params) => {
  console.log("这是adduser的"+ params)
  return axios.get("/addUser",{
    params: params
  }).then(res=>res.data);

};
export const login = (params) => {
  return axios.post("/auth",params).then(res=>res);
};

