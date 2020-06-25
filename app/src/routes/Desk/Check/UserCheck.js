import React from 'react'
import {Card, Table, BackTop, Button, Form, message, Input} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

const FormItem = Form.Item

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '总费用',
    dataIndex: 'cost',
    key: 'cost',
  }]

const data1 = [
  {
    key: '1',
    id: '101',
    name: '张三',
    cost: 100
  }]

@Form.create()
class TableDemo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.warning('请先输入房间号')
      } else {
        message.success('打印成功')
        // console.log(values)
      }
    });
  }

render() {
  const {getFieldDecorator} = this.props.form
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
      <CustomBreadcrumb arr={['个人账单打印']}/>
      <Card bordered={false} title='个人账单信息' style={{marginBottom: 10}} id='basicUsage'>
          <FormItem label='房间号' {...formItemLayout}>
            {
              getFieldDecorator('costhigh', {
                rules: [
                  {
                    pattern: /^[0-9][0-9][0-9]$/,
                    required: true,
                    message: '请输入正确的房间号'
                  }
                ]
              })(
                <Input/>
              )
            }
          </FormItem>
        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={false}>确定</Button>
        </FormItem>
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