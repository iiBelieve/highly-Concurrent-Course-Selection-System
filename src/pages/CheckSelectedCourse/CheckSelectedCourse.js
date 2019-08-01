import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination,Modal,message } from 'antd';
import styles from './CheckSelectedCourse.less';

@connect(({ checkSelectedCourse, loading }) => ({
  checkSelectedCourse,
  loading: loading.models.checkSelectedCourse,
}))

class CheckSelectedCourse extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
    rowNum: 1
  };

  columns = [
    {
      title: '学生姓名',
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
      title: '课程课时',
      dataIndex: 'courseClass',
      key: 'courseClass',
      align:"center",
    },
    {
      title: '上课时间',
      dataIndex: 'time',
      key: 'time',
      align:"center",
    },
    {
      title: '课程学分',
      dataIndex: 'grade',
      key: 'grade',
      align:"center",
    },
    {
      title: '取消选课',
      align:"center",
      render: (record) => (
        <a onClick={() => this.handleDeleteCourses(record)}>取消</a>
      ),
    },
  ];

  componentDidMount() {
    this.getDataAnalysis()
  }

  handleDeleteCourses = (record) => {
    const { dispatch } = this.props;
    const { rowNum, pageSize } = this.state;
    const pageNum = rowNum;
    const pages = { pageNum, pageSize };
    Modal.confirm({
      title: '取消已经选择的课程',
      content: (
        <span>是否取消：{record.courseName} ？</span>
      ),
      onOk: () => {
        dispatch({
          type: 'checkSelectedCourse/deleteCourses',
          payload: record.courseNum,
          callback: (response) => {
            console.log(response);
            dispatch({
              type: 'checkSelectedCourse/fetch',
              payload: pages,
              callback: () => {
                this.renderTable();
                message.success(response.message);
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
      type: 'checkSelectedCourse/fetch',
      payload: pages,
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
        type: 'checkSelectedCourse/fetch',
        payload: pages,
      });
    });

  };

  renderTable = () => {
    const {
      checkSelectedCourse: { data },
      loading
    } = this.props;
    console.log(data);
    const { courseSelection, total } = data;

    return (
      <div>
        <Row className={styles.top2}>
          <Table
            dataSource={courseSelection}
            columns={this.columns}
            pagination={false}
            rowKey={record => record.courseNum}
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

  render() {

    return (

      <div className={styles.box}>

        {
          this.renderTable()
        }

      </div>
    );
  }
}

export default CheckSelectedCourse
