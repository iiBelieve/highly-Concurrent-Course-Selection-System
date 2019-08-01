export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user', "root"],
    routes: [
      { path: '/', redirect: '/user/login' },
      // 查看课程
      {
        path: '/viewCourses/viewCourses',
        name: 'viewCourses',
        authority: ['admin', 'user'],
        component: './ViewCourses/ViewCourses',
      },

      // 选择课程
      {
        path: '/selectiveCourses/selectiveCourses',
        name: 'selectiveCourses',
        authority: ['admin'],
        component: './SelectiveCourses/SelectiveCourses',
      },

      // 已选课程
      {
        path: '/checkSelectedCourse/checkSelectedCourse',
        name: 'checkSelectedCourse',
        authority: ['admin'],
        component: './CheckSelectedCourse/CheckSelectedCourse',
      },

      // 学期课程表
      {
        path: '/classSchedule/classSchedule',
        name: 'classSchedule',
        authority: ['admin'],
        component: './ClassSchedule/ClassSchedule',
      },

      // 班级信息
      {
        path: '/classInformation/classInformation',
        name: 'classInformation',
        authority: ['admin'],
        component: './ClassInformation/ClassInformation',
      },

      // 老师选择课程
      {
        path: '/teacherView/teacherView',
        name: 'teacherView',
        authority: ['user'],
        component: './TeacherView/TeacherView',
      },

      // 老师查看所教课程
      {
        path: '/teacherView/teachClass',
        name: 'teachClass',
        authority: ['user'],
        component: './TeacherView/TeachClass',
      },

      // 管理人员控制评分与选课
      {
        path: '/rootControl/rootControl',
        name: 'rootControl',
        authority: ['root'],
        component: './RootControl/RootControl',
      },

      // 修改密码
      {
        path: '/changePassword/changePassword',
        name: 'changePassword.changePassword',
        component: './ChangePassword/ChangePassword',
        hideInMenu: true,
      },

      {
        component: '404',
      },
    ],
  },
];
