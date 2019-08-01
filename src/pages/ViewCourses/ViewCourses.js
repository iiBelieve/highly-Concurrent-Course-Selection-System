import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination, } from 'antd';
import styles from './ViewCourses.less';

@connect(({ viewCourses, loading }) => ({
  viewCourses,
  loading: loading.models.viewCourses,
}))

class ViewCourses extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
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
  ];

  componentWillMount = () => {
    this.getDataAnalysis();
    console.log("跳转进来了VC")
  };

  componentDidMount = () => {
    this.getDataAnalysis();
  };

  getDataAnalysis = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;

    console.log(pageNum);
    console.log(pageSize);
    const pages = { pageNum, pageSize };
    console.log(pages);
    dispatch({
      type: 'viewCourses/fetch',
      payload: pages,
    });
  };

  getData = (pageNum) => {
    const { dispatch } = this.props;
    const { pageSize } = this.state;

    console.log(pageNum);
    console.log(pageSize);
    const pages = { pageNum, pageSize };
    console.log(pages);
    dispatch({
      type: 'viewCourses/fetch',
      payload: pages,
    });
  };


  renderTable = () => {
    const {
      viewCourses: { data },
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

export default ViewCourses
