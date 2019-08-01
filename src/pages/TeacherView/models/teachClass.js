import { getAllTeachClass, getAllTeachClassName, downLoadExcel } from '@/services/teacherAbout';
import { getUserName } from '@/services/writing';

export default {
  namespace: 'teachClass',

  state: {
    data: {
      rows: [],
    },
    classNameList: {
      className: []
    }
  },

  effects: {
    // 获取所教课程列表
    * fetch({ payload }, { call, put }) {
      const response = yield call(getAllTeachClass, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

     // 获取所教课程课程名字列表
    * getClassName({ payload, callback }, { call, put }) {
      const response = yield call(getAllTeachClassName, payload);
      yield put({
        type: 'saveClassName',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 下载 Excel
    * getDownLoadExcel({ payload, callback }, { call, put }) {
      const response = yield call(downLoadExcel, payload);
      yield put({
        type: 'saveClassName',
        payload: response,
      });
      if (callback) callback();
    },

    // 获取个人信息
    * getMyself({ payload, callback }, { call, put }) {
      const response = yield call(getUserName, payload);
      yield put({
        type: 'saveClassName',
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

    saveClassName(state, action) {
      return {
        ...state,
        classNameList: {
          ...action.payload,
        },
      };
    },
  },
};
