import React from 'react'
import {Card, Cascader, Form, Select, Button, message, BackTop} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

const FormItem = Form.Item
const Option = Select.Option

const options = [
  {
    label: '高风',
    value: 'high'
  },
  {
    label: '中风',
    value: 'mid'
  },
  {
    label: '低风',
    value: 'low'
  }
]

@Form.create()
class FormDemo1 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.warning('请先填写正确的表单')
      } else {
        message.success('提交成功')
        // console.log(values)
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form
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
        <CustomBreadcrumb arr={['客户界面', '空调使用', '风速调整']}/>
        <Card bordered={false} title='风速调整'>
          <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
            <FormItem label='风速' {...formItemLayout} required>
              {
                getFieldDecorator('residence', {
                  rules: [
                    {
                      type: 'array',
                      required: true,
                      message: '请选择风速'
                    }
                  ]
                })(
                  <Cascader options={options} expandTrigger="hover" placeholder=''/>
                )
              }
            </FormItem>
            <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={false}>确定</Button>
            </FormItem>
          </Form>
        </Card>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default FormDemo1