import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination,Modal, message, Input } from 'antd';
import styles from './TeacherView.less';

@connect(({ teacherView, loading }) => ({
  teacherView,
  loading: loading.models.teacherView,
}))

class TeacherView extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
    score: 0,
    rowNum: 1,
    gradeFlag : null,
    early: '',
  };

  columns = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      align:"center",
    },
    {
      title: '课程老师',
      dataIndex: 'teacherName',
      key: 'teacherName',
      align:"center",
    },
    {
      title: '课程教室',
      dataIndex: 'address',
      key: 'address',
      align:"center",
    },
    {
      title: '上课时间',
      dataIndex: 'time',
      key: 'time',
      align:"center",
    },
    {
      title: '学生',
      dataIndex: 'studentName',
      key: 'studentName',
      align:"center",
    },
    {
      title: '学生学号',
      dataIndex: 'studentNum',
      key: 'studentNum',
      align:"center",
    },
    {
      title: '分数',
      dataIndex: 'grade',
      key: 'grade',
      align:"center",
    },
    {
      title: '评分',
      render: (record) => (
        <a onClick={() => this.handleGrade(record)}>评分</a>
      ),
    },
  ];

  componentDidMount() {
    this.getControlClass();
  }

  handleGrade = (record) => {
    Modal.confirm({
      title: '请进行课程评分',
      content: (
        <Input
          onChange={(val) => {
            this.setState({
              score : val.target.value,
            });
          }}
        />
      ),
      onOk: () => {
        const {score}=this.state;
        const { dispatch } = this.props;
        const value = {};
        value.courseNum = record.courseNum;
        value.studentNum = record.studentNum;
        value.grade = score;
        console.log(value);
        dispatch({
          type: 'teacherView/postScore',
          payload: value,
          callback: () => {
            const { rowNum, pageSize } = this.state;
            const pageNum = rowNum;
            console.log(pageNum);
            console.log(pageSize);
            const pages = { pageNum, pageSize };
            dispatch({
              type: 'teacherView/fetch',
              payload: pages,
              callback: () => {
                this.renderTable();
                message.success("评分成功!");
              }
            });
          }
        });
      },
      onCancel() {},
    });
  };

  getDataAnalysis = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;

    console.log(pageNum);
    console.log(pageSize);
    const pages = { pageNum, pageSize };
    console.log(pages);
    dispatch({
      type: 'teacherView/fetch',
      payload: pages,
    });
  };

  getControlClass = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'teacherView/controlGrade',
      callback: (response) => {
        if (response.ifInputGrade === 0) {
          this.setState({
            gradeFlag: response.ifInputGrade
          }, () => {
            this.getDataAnalysis();
          })
        }
        if (response.ifInputGrade === 1) {
          this.setState({
            gradeFlag: response.ifInputGrade
          }, () => {
            this.renderTooEarly();
          });
        }
      }
    });
  };

  getData = (pageNum) => {
    const { dispatch } = this.props;
    const { pageSize } = this.state;

    this.setState({
      rowNum: pageNum,
    }, () => {
      console.log(pageNum);
      console.log(pageSize);
      const pages = { pageNum, pageSize };
      console.log(pages);
      dispatch({
        type: 'teacherView/fetch',
        payload: pages,
      });
    });
  };

  renderTable = () => {
    const {
      teacherView: { data },
      loading
    } = this.props;
    console.log(data);
    const { courses, total } = data;

    return (
      <div>
        <Row className={styles.top2}>
          <Table
            dataSource={courses}
            columns={this.columns}
            pagination={false}
            rowKey={record => record.id}
            bordered
            loading={loading}
          />
        </Row>

        <Row className={styles.top3}>
          <Pagination total={isNaN(total) ? 0 : total} onChange={this.getData} showQuickJumper  />
        </Row>
      </div>
    )


  };

  renderTooEarly = () => {
    const page = (
      <div style={{display: 'flex', minHeight: 400, justifyContent: 'center', alignItems: 'center'}}>
        <span style={{ fontSize: 16}}>不在规定评分时间内，无法对课程进行评分，请联系管理人员开启评分通道。</span>
      </div>
    );

    this.setState({
      early: page
    });

  };

  render() {

    const { early, gradeFlag } = this.state;

    return (

      <div className={styles.box}>

        {
          gradeFlag === 0 ? this.renderTable() : early
        }

      </div>
    );
  }
}

export default TeacherView
