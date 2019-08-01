import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination, } from 'antd';
import styles from './ClassSchedule.less';

@connect(({ classSchedule, loading }) => ({
  classSchedule,
  loading: loading.models.classSchedule,
}))

class ClassSchedule extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
  };

  columns = [
    {
      title: '课程序号',
      dataIndex: 'courseNum',
      key: 'courseNum',
      align:"center",
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      align:"center",
    },
    {
      title: '专业名称',
      dataIndex: 'majorName',
      key: 'majorName',
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
      title: '上课总人数',
      dataIndex: 'totalNumber',
      key: 'totalNumber',
      align:"center",
    },
  ];

  componentDidMount() {
    this.getDataAnalysis()
  }

  getDataAnalysis = () => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;

    console.log(pageNum);
    console.log(pageSize);
    const pages = { pageNum, pageSize };
    console.log(pages);
    dispatch({
      type: 'classSchedule/fetch',
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
      type: 'classSchedule/fetch',
      payload: pages,
    });
  };


  renderTable = () => {
    const {
      classSchedule: { data },
      loading
    } = this.props;
    console.log(data);
    const { allCourse, total } = data;

    return (
      <div>
        <Row className={styles.top2}>
          <Table
            dataSource={allCourse}
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

export default ClassSchedule
