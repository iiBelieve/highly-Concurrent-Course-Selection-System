import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import styles from './RootControl.less';

@connect(({ rootControl, loading }) => ({
  rootControl,
  loading: loading.models.rootControl,
}))

class RootControl extends PureComponent {
  state = {

  };

  handleControlClass = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "rootControl/controlClass",
      callback: (response) => {
       if (response.message === "已设置为可选课!") {
         message.success("成功开启选课通道，学生可以开始选课!");
       }
       if (response.message === "已设置为不能选课!") {
         message.success("成功关闭选课通道，学生不可以选课!");
       }

      }
    });
  };

  handleControlGrade = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "rootControl/controlGrade",
      callback: (response) => {
        if (response.message === "已设置为可录取成绩!") {
          message.success("成功开启评分通道，老师可以对课程进行评分!");
        }
        if (response.message === "已设置为不能录取成绩!") {
          message.success("成功关闭评分通道，老师不可以对课程进行评分!");
        }

      }
    });
  };


  render() {

    return (

      <div className={styles.box}>

        <Button type="primary" size="large" style={{height:40}} onClick={() => {this.handleControlClass()}}>
          选课控制
        </Button>

        <Button type="primary" size="large" style={{height:40, marginLeft: 100}} onClick={() => {this.handleControlGrade()}}>
          评分控制
        </Button>

      </div>
    );
  }
}

export default RootControl
