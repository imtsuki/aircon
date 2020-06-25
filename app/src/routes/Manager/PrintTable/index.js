import React from 'react'
import {Card, Table, BackTop, Button, Form, message} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

const FormItem = Form.Item

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '使用空调次数',
    dataIndex: 'usenum',
    key: 'usenum',
  }, {
    title: '最常用目标温度',
    dataIndex: 'temperature',
    key: 'temperature',
  }, {
    title: '最常用风速',
    dataIndex: 'wind',
    key: 'wind',
  }, {
    title: '达到目标温度次数',
    dataIndex: 'targetnum',
    key: 'targetnum',
  }, {
    title: '被调度次数',
    dataIndex: 'dispatchnum',
    key: 'dispatchnum',
  }, {
    title: '详单记录数',
    dataIndex: 'records',
    key: 'records',
  }, {
    title: '总费用',
    dataIndex: 'cost',
    key: 'cost',
  }]

const data1 = [
  {
    key: '1',
    id: '101',
    usenum: 10,
    temperature: 32,
    wind: '高风',
    targetnum: 8,
    dispatchnum: 8,
    records: 10,
    cost: 100
  },{
    key: '2',
    id: '102',
    usenum: 10,
    temperature: 26,
    wind: '低风',
    targetnum: 8,
    dispatchnum: 8,
    records: 10,
    cost: 100
  },{
    key: '3',
    id: '103',
    usenum: 10,
    temperature: 20,
    wind: '高风',
    targetnum: 8,
    dispatchnum: 8,
    records: 10,
    cost: 100
  },{
    key: '4',
    id: '104',
    usenum: 10,
    temperature: 22,
    wind: '中风',
    targetnum: 8,
    dispatchnum: 8,
    records: 10,
    cost: 100
  }]

class TableDemo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.warning('请先选择报表类型')
      } else {
        message.success('打印成功')
        // console.log(values)
      }
    });
  }

render() {
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 4},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 4,
      },
    },
  }
  return (
    <div>
      <CustomBreadcrumb arr={['报表打印']}/>
      <Card bordered={false} title='报表信息' style={{marginBottom: 10}} id='basicUsage'>
           <p>
            <Button>日报表</Button>&emsp;
            <Button>周报表</Button>&emsp;
            <Button>月报表</Button>
          </p>
        <Table dataSource={data1} columns={columns1} style={styles.tableStyle}/>
        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={false}>打印</Button>
        </FormItem>
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