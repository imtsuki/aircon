import React from 'react';
import {
  Card,
  Popconfirm,
  Button,
  Icon,
  Table,
  Divider,
  BackTop,
  Affix,
  Anchor,
  Form,
  InputNumber,
  Input,
} from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';
import request from '../../../utils/request';
const columns1 = [
  {
    title: '房间号',
    dataIndex: 'roomId',
  },
  {
    title: '入住状态',
    dataIndex: 'active',
  },
  {
    title: '用户姓名',
    dataIndex: 'username',
  },
];

const data1 = [
  {
    key: '1',
    id: '101',
    checkin: '是',
    name: '张三',
  },
];

class TableDemo extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      let data = (await request.get('/api/checkin')).data;
      console.log(data);
      this.setState({
        data: data,
      });
    } catch (e) {}
  }

  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['房间信息', '信息显示']} />
        <Card
          bordered={false}
          title="入住状态"
          style={{ marginBottom: 10 }}
          id="basicUsage"
        >
          <Table
            dataSource={this.state.data}
            columns={columns1}
            style={styles.tableStyle}
          />
        </Card>
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </div>
    );
  }
}

const styles = {
  tableStyle: {
    width: '80%',
  },
  affixBox: {
    position: 'absolute',
    top: 100,
    right: 50,
    with: 170,
  },
};

export default TableDemo;
