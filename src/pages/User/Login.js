import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Link from 'umi/link';
import router from 'umi/router';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Alert, Button } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'stuAccount',
    lineUp: "",
    login: "",
    flag: false,
  };

  componentWillMount = () => {
    this.setState({
      flag: false
    });
  };

  componentDidMount() {
    this.setState({
      flag: false
    }, () => {
      this.renderLogin();
    });
  }

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      if (type === "root") {
        dispatch({
          type: 'login/rootLogin',
          payload: {
            ...values,
            type,
          },
        });
      }
      if (type === "stuAccount" || type === "TeacherAccount") {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type,
          },
          callback: (response) => {
            if (response.status === 'ok') {
              console.log(type);
              dispatch({
                type: 'login/getList',
                callback: (response1) => {
                  console.log(response1);
                  if (response1.message === 'ok') {
                    console.log("进来了");
                    router.push({
                      pathname: '/viewCourses/viewCourses',
                    });
                  } else {
                    this.renderLineUp(response1);
                  }
                }
              });
            }
          }
        });
      }
    }
  };

  // renderGoHome = () => (
  //   <Link to={{ pathname: '/viewCourses/viewCourses' }} />
  // );

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  renderLineUp = (value) => {
    console.log("value");
    console.log(value);
    const page = (
      <div style={{height: 300, width: 360, display: 'flex', alignItems: 'center'}} key={1}>
        <span style={{fontSize: 22}}>{value.message}</span>
      </div>
    );
    this.setState({
      flag: true,
      lineUp: page
    }, () => {
      this.handleFlag();
    })
  };

  renderLogin = () => {
    const { login, submitting } = this.props;
    const { type } = this.state;
    const page = (
      <Login
        defaultActiveKey={type}
        onTabChange={this.onTabChange}
        onSubmit={this.handleSubmit}
        ref={form => {
          this.loginForm = form;
        }}
      >

        {/* 学生登录 */}
        <Tab key="stuAccount" tab={formatMessage({ id: 'app.login.tab-login-student' })}>
          {login.status === 'error' &&
          login.type === 'stuAccount' &&
          !submitting &&
          this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials-stu' }))}
          <UserName
            name="username"
            placeholder={`${formatMessage({ id: 'app.login.stuNumber' })}: 请输入学生学号`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.stuNumber.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({ id: 'app.login.stuPassword' })}: 请输入密码`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.stuPassword.required' }),
              },
            ]}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
        </Tab>

        {/* 教师登录 */}
        <Tab key="TeacherAccount" tab={formatMessage({ id: 'app.login.tab-login-teacher' })}>
          {login.status === 'error' &&
          login.type === 'TeacherAccount' &&
          !submitting &&
          this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials-tea' }))}
          <UserName
            name="username"
            placeholder={`${formatMessage({ id: 'app.login.teaNumber' })}: 请输入教师工号`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.teaNumber.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({ id: 'app.login.teaPassword' })}: 请输入密码`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.teaPassword.required' }),
              },
            ]}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
        </Tab>

        {/* 管理员登录 */}
        <Tab key="root" tab={formatMessage({ id: 'app.login.tab-login-root' })}>
          {login.status === 'error' &&
          login.type === 'root' &&
          !submitting &&
          this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials-root' }))}
          <UserName
            name="username"
            placeholder={`${formatMessage({ id: 'app.login.root' })}: 请输入管理员账号`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.root.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({ id: 'app.login.rootPassword' })}: 请输入密码`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.rootPassword.required' }),
              },
            ]}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
        </Tab>


        <Submit loading={submitting}>
          <FormattedMessage id="app.login.login" />
        </Submit>

        <div className={styles.other}>
          <Button type="primary" style={{width: '100%', height:40}}>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </Button>
        </div>

      </Login>
    );
    this.setState({
      login: page
    });
  };

  handleFlag = () => {
    const { flag, lineUp, login } = this.state;
    return (
      <div>
        {
          flag ? lineUp : login
        }
      </div>
    )
  };

  render() {

    return (
      <div className={styles.main}>
        { this.handleFlag() }
      </div>
    );
  }
}

export default LoginPage;
