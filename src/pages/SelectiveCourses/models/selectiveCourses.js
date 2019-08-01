import { getCourses, addCourses, getControl } from '../../../services/viewCourses';

export default {
  namespace: 'selectiveCourses',

  state: {
    data: {
      rows: [],
    },
    control: {
      ifTakeCourse: null,
      ifInputGrade: null,
    }
  },

  effects: {
    // 获取课程列表
    * fetch({ payload, callback }, { call, put }) {
      const response = yield call(getCourses, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 学生选择课程列表
    * add({ payload, callback }, { call, put }) {
      const response = yield call(addCourses, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    * controlClass({ payload, callback }, { call, put }) {
      const response = yield call(getControl, payload);
      yield put({
        type: 'saveControl',
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

    saveControl(state, action) {
      return {
        ...state,
        control: {
          ...action.payload,
        },
      };
    },

  },
};
