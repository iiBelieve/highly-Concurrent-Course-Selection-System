import { stringify } from 'qs';
import request from '../utils/request';

// 查看全部课程
export async function courses(params) {
  console.log(params);
  return request('/api/course/view', {
    method: 'POST',
    body: params,
  });
}

// 查看全部课程
export async function getCourses(params) {
  return request(`/api/course/view?${stringify(params)}`);
}

// 学校选课
export async function addCourses(params) {
  console.log(params);
  return request('/api/courseSelection/add', {
    method: 'POST',
    body: params,
  });
}

// 查看已选课程
export async function getMySelfCourses(params) {
  return request(`/api/courseSelection/view?${stringify(params)}`);
}

// 删除自己的选课
export async function deleteMySelfCourses(params) {
  return request(`/api/courseSelection/delete?courseSelectionNum=${params}`);
}

// 获取本学期的课程表
export async function getClassSchedule(params) {
  return request(`/api/allCourses/view?${stringify(params)}`);
}

// 查看班级信息
export async function getClassInfo(params) {
  return request(`/api/student/all?${stringify(params)}`);
}

// 获取是否可以选课和是否可以评分
export async function getControl() {
  return request(`/api/control/getControl`);
}
