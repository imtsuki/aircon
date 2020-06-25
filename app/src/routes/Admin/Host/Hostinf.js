import React from 'react';
import { Card, Table, BackTop } from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';

const columns1 = [
  {
    title: '温控模式',
    dataIndex: 'mode',
    key: 'mode',
  },
  {
    title: '缺省温度',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    title: '高风费率',
    dataIndex: 'costhigh',
    key: 'costhigh',
  },
  {
    title: '中风费率',
    dataIndex: 'costmid',
    key: 'costmid',
  },
  {
    title: '低风费率',
    dataIndex: 'costlow',
    key: 'costlow',
  },
  {
    title: '服务对象个数',
    dataIndex: 'service',
    key: 'service',
  },
];

const data1 = [
  {
    key: '1',
    mode: '制冷（18-26度）',
    temperature: 26,
    costhigh: 3,
    costmid: 2,
    costlow: 1,
    service: 3,
  },
];

class TableDemo extends React.Component {
  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['主控机', '信息显示']} />
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
