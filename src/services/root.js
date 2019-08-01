// import { stringify } from 'qs';
import request from '@/utils/request';


// 后台管理人员选课控制
export async function rootControlClass() {
  return request(`/api/control/class`);
}

// 后台管理人员成绩控制
export async function rootControlGrade() {
  return request(`/api/control/grade`);
}

