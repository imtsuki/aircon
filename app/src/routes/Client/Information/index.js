import React from 'react';
import {
  Card,
  Statistic,
  Row,
  Col,
  Switch,
  Button,
  BackTop,
  Radio,
  Slider,
  Icon,
  InputNumber,
  Input,
} from 'antd';
import { blue, red } from '@ant-design/colors';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';

const columns = [
  {
    title: '合计金额',
    dataIndex: 'cost',
    key: 'cost',
  },
];

const data = [
  {
    key: '1',
    cost: 100,
  },
];

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
];

const data1 = [
  {
    key: '1',
    id: '101',
    temperature: 32,
    wind: '高风',
    aircontem: 26,
  },
];

class TableDemo extends React.Component {
  state = {
    targetTemp: 25,
  };

  onTargetTempChange = (value) => {
    this.setState({
      targetTemp: value,
    });
  };

  render() {
    const { targetTemp } = this.state;
    return (
      <div>
        <CustomBreadcrumb arr={['用户界面', '信息显示']} />
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Card>
              <Statistic title="房间号" value="101" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前温度"
                value={11.28}
                precision={2}
                valueStyle={{ color: blue.primary }}
                prefix={<Icon type="arrow-down" />}
                suffix="℃"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前账单费用"
                value={9.3}
                precision={2}
                prefix={<Icon type="pay-circle" />}
                suffix="元"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前状态"
                value="关机"
                valueStyle={{ color: red.primary }}
                prefix={<Icon type="poweroff" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前模式"
                value="制热"
                valueStyle={{ color: red.primary }}
                prefix={<Icon type="fire" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前风速"
                value="中风"
                valueStyle={{ color: red.primary }}
                prefix={<Icon type="loading" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="目标温度"
                value={11}
                valueStyle={{ color: red.primary }}
                suffix="℃"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={12}>
            <Card title="操作面板">
              <div>
                开关机：
                <Switch checkedChildren="开" unCheckedChildren="关" />
              </div>

              <div style={{ marginTop: 16 }}>
                模式：
                <Radio.Group defaultValue="cooling" buttonStyle="solid">
                  <Radio.Button value="cooling">制冷</Radio.Button>
                  <Radio.Button value="heating">制热</Radio.Button>
                </Radio.Group>
              </div>

              <div style={{ marginTop: 16 }}>
                风速：
                <Radio.Group defaultValue="medium" buttonStyle="solid">
                  <Radio.Button value="low">低风</Radio.Button>
                  <Radio.Button value="medium">中风</Radio.Button>
                  <Radio.Button value="high">高风</Radio.Button>
                </Radio.Group>
              </div>
              <div style={{ marginTop: 16 }}>
                目标温度：
                <Row>
                  <Col span={12}>
                    <Slider
                      min={18}
                      max={25}
                      onChange={this.onTargetTempChange}
                      value={targetTemp}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={18}
                      max={25}
                      style={{ marginLeft: 16 }}
                      value={targetTemp}
                      onChange={this.onTargetTempChange}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

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
