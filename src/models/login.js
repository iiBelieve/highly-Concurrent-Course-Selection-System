import { routerRedux } from 'dva/router';
// import { stringify } from 'qs';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { loginServer, getFakeCaptcha, getLineUp, outLineUp, loginRootServer } from '../services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({ payload, callback }, { call, put }) {
      const response = yield call(loginServer, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      sessionStorage.setItem('token', response.accessToken);
      console.log(sessionStorage.getItem('token'));
      if (callback) callback(response);
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
          }
        }
      }
    },

    * rootLogin({ payload, callback }, { call, put }) {
      const response = yield call(loginRootServer, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      sessionStorage.setItem('token', response.accessToken);
      if (callback) callback(response);
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
          }
        }
        yield put(routerRedux.replace('/rootControl/rootControl'));
      }
    },

    * getList({ payload, callback }, { call, put }) {
      const response1 = yield call(getLineUp, payload);
      yield put({
        type: 'save',
        payload: response1,
      });
      if (callback) callback(response1);
    },

    * outList({ payload, callback }, { call, put }) {
      const response = yield call(outLineUp, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout({ _, callback }, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      if (callback) callback();
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
