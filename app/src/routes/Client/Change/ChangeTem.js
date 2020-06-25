import React from 'react'
import {Card, Form, Select, Input, Button, message, BackTop} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'

const FormItem = Form.Item
const Option = Select.Option

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
        <CustomBreadcrumb arr={['客户界面', '空调使用', '温度调整']}/>
        <Card bordered={false} title='温度调整'>
          <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
          <FormItem label='温度' {...formItemLayout}>
              {
                getFieldDecorator('temperature', {
                  rules: [
                    {
                      len: 11,
                      pattern: /^[0-9][0-9]$/,
                      required: true,
                      message: '请输入正确的温度'
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
          </Form>
        </Card>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default FormDemo1