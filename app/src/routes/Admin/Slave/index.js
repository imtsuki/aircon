import React from 'react';
import { Card, Table, BackTop } from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '室内温度',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    title: '风速',
    dataIndex: 'wind',
    key: 'wind',
  },
  {
    title: '空调温度',
    dataIndex: 'aircontem',
    key: 'aircontem',
  },
  {
    title: '从控机运行状态',
    dataIndex: 'slave',
    key: 'slave',
  },
];

const data1 = [
  {
    key: '1',
    id: '101',
    temperature: 32,
    wind: '高风',
    aircontem: 26,
    slave: '是',
  },
  {
    key: '2',
    id: '102',
    temperature: 26,
    wind: '低风',
    aircontem: 26,
    slave: '否',
  },
  {
    key: '3',
    id: '103',
    temperature: 20,
    wind: '高风',
    aircontem: 18,
    slave: '是',
  },
  {
    key: '4',
    id: '104',
    temperature: 22,
    wind: '中风',
    aircontem: 20,
    slave: '是',
  },
];

class TableDemo extends React.Component {
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
            dataSource={data1}
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
