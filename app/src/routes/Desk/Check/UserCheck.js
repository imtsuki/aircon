import React from 'react';
import {
  Col,
  Statistic,
  Icon,
  Card,
  Table,
  BackTop,
  Button,
  Form,
  message,
  Input,
  Row,
} from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';
import request from '../../../utils/request';

import { Typography } from 'antd';

const { Title } = Typography;

const FormItem = Form.Item;

const columns1 = [
  {
    title: '时间戳',
    dataIndex: 'timestamp',
  },
  {
    title: '房间号',
    dataIndex: 'roomId',
  },
  {
    title: '事件类型',
    dataIndex: 'eventType',
  },
  {
    title: '模式',
    dataIndex: 'windMode',
  },
  {
    title: '风速',
    dataIndex: 'windSpeed',
  },
  {
    title: '当前温度',
    dataIndex: 'curTemp',
  },
  {
    title: '目标温度',
    dataIndex: 'targetTemp',
  },
  {
    title: '耗电量',
    dataIndex: 'fee',
    key: 'watts',
  },
  {
    title: '费用',
    dataIndex: 'fee',
    key: 'fee',
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

@Form.create()
class TableDemo extends React.Component {
  state = {
    fee: 0,
    logs: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        message.warning('请先输入用户名');
      } else {
        console.log(values);
        try {
          let detail = (await request.get(`/api/detail/${values.username}`))
            .data;
          console.log(detail);
          for (let log of detail.logs) {
            log.curTemp = log.curTemp.toFixed(2);
            log.fee = log.fee.toFixed(2);
            log.timestamp = new Date(log.timestamp).toTimeString();
            log.windSpeed = getWindSpeedName(log.windSpeed);
          }
          this.setState({ fee: detail.fee, logs: detail.logs });

          message.success('打印成功');
        } catch (e) {
          message.error('失败');
        }

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
        <CustomBreadcrumb arr={['账单详单打印']} />
        <Card
          bordered={false}
          title="账单详单打印"
          style={{ marginBottom: 10 }}
          id="basicUsage"
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入正确的客户名',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem style={{ textAlign: 'center' }} {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={false}>
                确定
              </Button>
            </FormItem>
          </Form>

          <Title>账单</Title>
          <Row style={{ marginBottom: 10 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="当前账单费用"
                  value={this.state.fee}
                  precision={2}
                  prefix={<Icon type="pay-circle" />}
                  suffix="元"
                />
              </Card>
            </Col>
          </Row>

          <Title>详单</Title>
          <Table
            dataSource={this.state.logs}
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
