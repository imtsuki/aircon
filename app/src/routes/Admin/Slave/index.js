import React from 'react';
import { Card, Table, BackTop } from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';
import request from '../../../utils/request';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'roomId',
  },
  {
    title: '运行状态',
    dataIndex: 'status',
  },
  {
    title: '空调模式',
    dataIndex: 'windMode',
  },
  {
    title: '空调风速',
    dataIndex: 'windSpeed',
  },
  {
    title: '当前温度',
    dataIndex: 'curTemp',
  },
  {
    title: '初始温度',
    dataIndex: 'initialTemp',
  },
  {
    title: '目标温度',
    dataIndex: 'targetTemp',
  },
  {
    title: '服务时长',
    dataIndex: 'servedTime',
  },
  {
    title: '等待时间',
    dataIndex: 'waitTime',
  },
];

function getWindSpeedName(s) {
  switch (s) {
    case 0:
      return '低风';
    case 1:
      return '中风';
    case 2:
      return '高风';
    default:
      return '未知';
  }
}

class TableDemo extends React.Component {
  state = {
    data: [],
  };

  async updateInfo() {
    try {
      let data = (await request.get('/api/status')).data;
      for (let r of data) {
        r.windSpeed = getWindSpeedName(r.windSpeed);
        r.curTemp = r.curTemp.toFixed(2);
      }
      this.setState({ data: data });
    } catch (e) {}
  }

  async componentDidMount() {
    await this.updateInfo();
    this.interval = setInterval(async () => await this.updateInfo(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['从控机', '信息显示']} />
        <Card
          bordered={false}
          title="空调信息"
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
