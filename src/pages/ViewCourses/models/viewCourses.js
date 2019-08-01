import { getCourses } from '@/services/viewCourses';

export default {
  namespace: 'viewCourses',

  state: {
    data: {
      rows: [],
    },
  },

  effects: {
    // 获取课程列表
    * fetch({ payload }, { call, put }) {
      const response = yield call(getCourses, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
