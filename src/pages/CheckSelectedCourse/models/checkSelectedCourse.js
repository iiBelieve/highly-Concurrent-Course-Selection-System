import { getMySelfCourses, deleteMySelfCourses } from '@/services/viewCourses';

export default {
  namespace: 'checkSelectedCourse',

  state: {
    data: {
      rows: [],
    },
  },

  effects: {
    // 获取课程列表
    * fetch({ payload, callback }, { call, put }) {
      const response = yield call(getMySelfCourses, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 删除自己的选课
    * deleteCourses({ payload, callback }, { call, put }) {
      const response = yield call(deleteMySelfCourses, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    },
  },
};
