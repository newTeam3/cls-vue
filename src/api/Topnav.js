import axios from "axios";
//得到当前登录用户得信息
export const userData = () => {
  return axios.get("/user").then(res=>res);
};
