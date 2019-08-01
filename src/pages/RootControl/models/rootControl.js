import { rootControlClass, rootControlGrade } from '../../../services/root';
import { getTeacherView } from '../../../services/teacherAbout';

export default {
  namespace: 'rootControl',

  state: {

  },

  effects: {

    * controlClass({ payload, callback }, { call, put }) {
      const response = yield call(rootControlClass, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    * controlGrade({ payload, callback }, { call, put }) {
      const response = yield call(rootControlGrade, payload);
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
