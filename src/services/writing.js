// import { stringify } from 'qs';
import request from '@/utils/request';

// 获取学生/老师的个人信息
export async function getUserName() {
  return request(`/api/student/userName`);
}


