import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination,message  } from 'antd';
import styles from './SelectiveCourses.less';

@connect(({ selectiveCourses, loading }) => ({
  selectiveCourses,
  loading: loading.models.selectiveCourses,
}))

class SelectiveCourses extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
    rowNum: 1,
    classFlag : null,
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
      dataIndex: 'courseCredit',
      key: 'courseCredit',
      align:"center",
    },
    {
      title: '课程剩余',
      dataIndex: 'overplus',
      key: 'overplus',
      align:"center",
    },
    {
      title: '已抢课程',
      dataIndex: 'numberOfParticipants',
      key: 'numberOfParticipants',
      align:"center",
    },
    {
      title: '课程总数',
      dataIndex: 'totalNumber',
      key: 'totalNumber',
      align:"center",
    },
    {
      title: '选课',
      align:"center",
      render: (record) => (
        <a onClick={() => this.handleAddCourses(record)}>选课</a>
      ),
    },
  ];

  componentDidMount() {
    this.getControlClass();
  }

  handleAddCourses = (record) => {
    const { dispatch } = this.props;
    const { rowNum, pageSize } = this.state;
    const pageNum = rowNum;
    const pages = { pageNum, pageSize };
    const value = {
      courseNum: record.courseNum
    };
    dispatch({
      type: 'selectiveCourses/add',
      payload: value,
      callback: (response) => {
        if (response.message === "请不要重复选课" ) {
          dispatch({
            type: 'selectiveCourses/fetch',
            payload: pages,
            callback: () => {
              this.renderTable();
              message.error(response.message);
            }
          });
        } else {
          dispatch({
            type: 'selectiveCourses/fetch',
            payload: pages,
            callback: () => {
              this.renderTable();
              message.success(response.message);
            }
          });
        }
      }
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
      type: 'selectiveCourses/fetch',
      payload: pages,
    });
  };

  getControlClass = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectiveCourses/controlClass',
      callback: (response) => {
        if (response.ifTakeCourse === 0) {
          this.setState({
            classFlag: response.ifTakeCourse
          }, () => {
            this.getDataAnalysis();
          })
        }
        if (response.ifTakeCourse === 1) {
          this.setState({
            classFlag: response.ifTakeCourse
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
        type: 'selectiveCourses/fetch',
        payload: pages,
      });
    });
  };

  renderTable = () => {
    const {
      selectiveCourses: { data },
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

  renderTooEarly = () => {
    const page = (
      <div style={{display: 'flex', minHeight: 400, justifyContent: 'center', alignItems: 'center'}}>
        <span style={{ fontSize: 16}}>不在规定选课时间内，无法进行选课，请先查看选课，找到自己想要选择的课程，等时间到了，再进行选课</span>
      </div>
    );

    this.setState({
      early: page
    });

  };

  render() {

    const { early, classFlag } = this.state;

    console.log("classFlag");
    console.log(classFlag);

    return (

      <div className={styles.box}>

        {
          classFlag === 0 ? this.renderTable() : early
        }

      </div>
    );
  }
}

export default SelectiveCourses
