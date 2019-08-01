import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination, } from 'antd';
import styles from './ClassInformation.less';

@connect(({ classInformation, loading }) => ({
  classInformation,
  loading: loading.models.classInformation,
}))

class ClassInformation extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
  };

  columns = [
    {
      title: '学生学号',
      dataIndex: 'studentNum',
      key: 'studentNum',
      align:"center",
      width: 100,
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName',
      align:"center",
      width: 100,
    },
    {
      title: '学生性别',
      width: 100,
      render: (record) => (
        <span>
          {
            record.studentSex === 1 ? "男" : "女"
          }
        </span>
      ),
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
      type: 'classInformation/fetch',
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
      type: 'classInformation/fetch',
      payload: pages,
    });
  };


  renderTable = () => {
    const {
      classInformation: { data },
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
            rowKey={record => record.studentNum}
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

export default ClassInformation
