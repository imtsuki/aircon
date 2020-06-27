import React from 'react';
import { Card, Table, BackTop, Button, Form, message } from 'antd';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';
import request from '../../../utils/request';

const FormItem = Form.Item;

const columns1 = [
  {
    title: '房间号',
    dataIndex: 'roomId',
  },
  {
    title: '使用空调次数',
    dataIndex: 'turnOnCount',
  },
  {
    title: '最常用目标温度',
    dataIndex: 'favTargetTemp',
  },
  {
    title: '最常用风速',
    dataIndex: 'favSpeed',
  },
  {
    title: '达到目标温度次数',
    dataIndex: 'pauseCount',
  },
  {
    title: '被调度次数',
    dataIndex: 'scheduledCount',
  },
  {
    title: '详单记录数',
    dataIndex: 'detailCount',
  },
  {
    title: '总费用',
    dataIndex: 'totalFee',
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
    report: [],
  };

  async componentDidMount() {
    const report = (await request.get('/api/report')).data;
    for (let r of report) {
      r.totalFee = r.totalFee.toFixed(2);
      r.favSpeed = getWindSpeedName(r.favSpeed);
    }
    console.log(report);
    this.setState({ report: report });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.warning('请先选择报表类型');
      } else {
        message.success('打印成功');
        // console.log(values)
      }
    });
  };

  render() {
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
        <CustomBreadcrumb arr={['报表打印']} />
        <Card
          bordered={false}
          title="报表信息"
          style={{ marginBottom: 10 }}
          id="basicUsage"
        >
          <p>
            <Button>日报表</Button>&emsp;
            <Button>周报表</Button>&emsp;
            <Button>月报表</Button>
          </p>
          <Table
            dataSource={this.state.report}
            columns={columns1}
            style={styles.tableStyle}
          />
          <FormItem style={{ textAlign: 'center' }} {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={false}
              onClick={window.print}
            >
              打印
            </Button>
          </FormItem>
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
