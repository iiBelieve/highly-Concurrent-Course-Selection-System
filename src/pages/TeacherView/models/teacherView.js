import { getTeacherView, postGrade } from '../../../services/teacherAbout';
import { getControl } from '../../../services/viewCourses';

export default {
  namespace: 'teacherView',

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
      const response = yield call(getTeacherView, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * postScore({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(postGrade, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * controlGrade({ payload, callback }, { call, put }) {
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
