import axios from "axios";
//获取学院班级数占比
export const getClasses = () => {
  return axios.get("/echarts/getClasses").then(res=>res);
};
//获取性别占比
export const getSex = () => {
  return axios.get("/echarts/getSex").then(res=>res);
};
