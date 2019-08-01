import { stringify } from 'qs';
import request from '../utils/request';

// 老师获取选择自己课程的学生
export async function getTeacherView(params) {
  return request(`/api/courseSelection/teacherGetClassAndStudent?${stringify(params)}`);
}

// 老师对课程进行评分
export async function postGrade(params) {
  console.log(params);
  return request('/api/courseSelection/grade', {
    method: 'POST',
    body: params,
  });
}

// 获取老师所教课程
export async function getAllTeachClass(params) {
  return request(`/api/courseSelection/teacherGetClassAndStudent?${stringify(params)}`);
}

// 获取老师所教课程的名称
export async function getAllTeachClassName() {
  return request(`/api/courseSelection/teacherGetAllClass`);
}

// 老师下载所教课程的表格
export async function downLoadExcel(params) {
  return request(`/api/downLoad/teacherSeeClass?courseNum=${params}`);
}
