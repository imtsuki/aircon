import React from 'react';
import {
  Card,
  Cascader,
  Tooltip,
  Icon,
  Form,
  Checkbox,
  Select,
  Input,
  Button,
  Col,
  Row,
  message,
  BackTop,
} from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';

const FormItem = Form.Item;
const Option = Select.Option;

const options = [
  {
    label: '制冷（温控范围18-26度）',
    value: 'cool',
  },
  {
    label: '制热（温控范围26-30度）',
    value: 'warm',
  },
];

const options1 = [
  {
    label: '2',
    value: 'two',
  },
  {
    label: '3',
    value: 'three',
  },
  {
    label: '4',
    value: 'four',
  },
  {
    label: '5',
    value: 'five',
  },
  {
    label: '6',
    value: 'six',
  },
  {
    label: '7',
    value: 'seven',
  },
];

@Form.create()
class FormDemo1 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.warning('请先填写正确的表单');
      } else {
        message.success('提交成功');
        // console.log(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
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
    };

    return (
      <div>
        <CustomBreadcrumb arr={['主控机', '主控机操作']} />
        <Card bordered={false} title="主控机操作">
          <Form
            layout="horizontal"
            style={{ width: '70%', margin: '0 auto' }}
            onSubmit={this.handleSubmit}
          >
            <FormItem label="温控模式" {...formItemLayout} required>
              {getFieldDecorator('residence', {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '请选择温控模式',
                  },
                ],
              })(
                <Cascader
                  options={options}
                  expandTrigger="hover"
                  placeholder=""
                />
              )}
            </FormItem>
            <FormItem label="缺省温度" {...formItemLayout}>
              {getFieldDecorator('temperature', {
                rules: [
                  {
                    len: 11,
                    pattern: /^[0-9][0-9]$/,
                    required: true,
                    message: '请输入正确的温度',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="高风费率" {...formItemLayout}>
              {getFieldDecorator('costhigh', {
                rules: [
                  {
                    len: 11,
                    pattern: /^[0-9]$/,
                    required: true,
                    message: '请输入正确的费率',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="中风费率" {...formItemLayout}>
              {getFieldDecorator('costmid', {
                rules: [
                  {
                    len: 11,
                    pattern: /^[0-9]$/,
                    required: true,
                    message: '请输入正确的费率',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="低风费率" {...formItemLayout}>
              {getFieldDecorator('costlow', {
                rules: [
                  {
                    len: 11,
                    pattern: /^[0-9]$/,
                    required: true,
                    message: '请输入正确的费率',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="服务对象个数" {...formItemLayout} required>
              {getFieldDecorator('service', {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '请选择温控模式',
                  },
                ],
              })(
                <Cascader
                  options={options1}
                  expandTrigger="hover"
                  placeholder=""
                />
              )}
            </FormItem>
            <FormItem style={{ textAlign: 'center' }} {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={false}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
        <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </div>
    );
  }
}

export default FormDemo1;
