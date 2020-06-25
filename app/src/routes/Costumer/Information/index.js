import React from 'react'
import {Card, Popconfirm, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

const columns = [
  {
    title: '合计金额',
    dataIndex: 'cost',
    key: 'cost',
  }]

const data = [
  {
    key: '1',
    cost: 100
  }]

  const columns1 = [
    {
      title: '房间号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '室内温度',
      dataIndex: 'temperature',
      key: 'temperature',
    }, {
      title: '风速',
      dataIndex: 'wind',
      key: 'wind',
    }, {
      title: '空调温度',
      dataIndex: 'aircontem',
      key: 'aircontem',
    }]
  
  const data1 = [
    {
      key: '1',
      id: '101',
      temperature: 32,
      wind: '高风',
      aircontem: 26,
    }]
  
class TableDemo extends React.Component {

  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['用户界面', '信息显示']}/>
        <Card bordered={false} title='账单信息' style={{marginBottom: 10}} id='basicUsage'>
          <Table dataSource={data} columns={columns} style={styles.tableStyle}/>
        </Card>
        <Card bordered={false} title='空调信息' style={{marginBottom: 10}} id='basicUsage'>
          <Table dataSource={data1} columns={columns1} style={styles.tableStyle}/>
        </Card>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

const styles = {
  tableStyle: {
    width: '80%'
  },
  affixBox: {
    position: 'absolute',
    top: 100,
    right: 50,
    with: 170
  }
}

export default TableDemo