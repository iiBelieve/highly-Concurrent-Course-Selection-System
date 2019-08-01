import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Table, Pagination, Select, message, Button } from 'antd';
import styles from './TeachClass.less';

@connect(({ teachClass, loading }) => ({
  teachClass,
  loading: loading.models.teachClass,
}))

class TeachClass extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10,
    option: [],
    className: [],
    classNum: null,
    teacherNum: ''
  };

  columns = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      align:"center",
    },
    {
      title: '学生名称',
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
  ];

  componentDidMount = () => {
    this.getDataAnalysis();
    this.getMyselfInfo();
  };

  getMyselfInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachClass/getMyself',
      callback: (response) => {
        console.log(response.username);
        this.setState({
          teacherNum: response.username
        })
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
      type: 'teachClass/fetch',
      payload: pages,
    });
    dispatch({
      type: 'teachClass/getClassName',
      callback: (response) => {
        this.setState({
          className: response
        }, () => {
          this.renderSelectOpthin();
        })
      }
    });
  };

  getData = (pageNum) => {
    const { dispatch } = this.props;
    const { pageSize } = this.state;

    console.log(pageNum);
    console.log(pageSize);
    this.setState({
      pageNum
    }, () => {
      const pages = { pageNum, pageSize };
      console.log(pages);
      dispatch({
        type: 'teachClass/fetch',
        payload: pages,
      });
    });

  };


  renderTable = () => {
    const {
      teachClass: { data },
      loading
    } = this.props;
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

  renderSelectOpthin = () => {
    const { className } = this.state;
    const page = [];
    for (let i = 0, len = className.length; i < len; i += 1) {
      page.push(
        <Select.Option value={`${className[i].courseNum}`} key={className[i].courseNum}>{className[i].courseName}</Select.Option>
      );
    }

    this.setState({
      option: page,
    })

  };

  handleSelect = (value) => {
   console.log(value);
    const { dispatch } = this.props;

    this.setState({
      classNum: value
    }, () => {
      const courseNum = value;
      const { pageSize, pageNum } = this.state;
      const pages = { pageNum, pageSize, courseNum };
      console.log(pages);
      dispatch({
        type: 'teachClass/fetch',
        payload: pages,
        callback: () => {
          this.renderTable()
        }
      });
    });
  };

  // handleDownLoad = () => {
  //   const { classNum } = this.state;
  //   console.log(classNum);
  //   if (classNum === null) {
  //     message.info("请选择需要下载的课程再进行下载。");
  //   } else {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'teachClass/getDownLoadExcel',
  //       payload: classNum,
  //     });
  //   }
  // };

  render() {

    const { option } = this.state;
    const { classNum, teacherNum} = this.state;
    return (

      <div className={styles.box}>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Select placeholder="请选择所要查看的课程" style={{ width: 328, marginLeft: 5}} onChange={this.handleSelect}>
            { option }
          </Select>
          <Button size="large" type="primary" style={{height: 40, width: 100, marginTop: -2}}>
            <a href={`/api/downLoad/teacherSeeClass?courseNum=${classNum}&userName=${teacherNum}`}>下载表格</a>
          </Button>
        </div>

        {
          this.renderTable()
        }

      </div>

    );
  }
}

export default TeachClass
