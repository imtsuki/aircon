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
  message,
} from 'antd';
import { blue, red } from '@ant-design/colors';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';
import { inject, observer } from 'mobx-react/index';
import { isAuthenticated } from '../../../utils/Session';
import request from '../../../utils/request';
import { debounce } from 'lodash';

@inject('appStore')
class ClientPanel extends React.Component {
  state = {
    checked: false,
    targetTemp: 25,
    windSpeed: 1,
    windMode: 'cooling',
    rising: false,
    roomStatus: {
      curTemp: 25,
      initialTemp: 25,
      roomId: 102,
      servedTime: 107,
      status: 'off',
      targetTemp: 23,
      waitTime: 0,
      windMode: 'cooling',
      windSpeed: 1,
    },
    roomId: 101,
    fee: 0,
  };

  constructor() {
    super();
    this.updateTargetTemp = debounce(this.updateTargetTemp, 1000);
  }

  async updateInfo() {
    try {
      const { roomId, fee } = (
        await request.get(`/api/checkin/${isAuthenticated()}`)
      ).data;
      this.setState({ roomId: roomId, fee: fee });
      const roomStatus = (await request.get(`/api/room/${roomId}/status`)).data;
      console.log(roomStatus);

      this.setState({
        roomStatus: roomStatus,
        windMode: roomStatus.windMode,
        windSpeed: roomStatus.windSpeed,
        checked: roomStatus.status !== 'off',
        rising: roomStatus.curTemp > this.state.roomStatus.curTemp,
      });
    } catch (e) {
      message.error(e.toString());
    }
  }

  async componentDidMount() {
    try {
      await this.updateInfo();
      this.interval = setInterval(async () => await this.updateInfo(), 1000);
    } catch (e) {
      message.error(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onWindModeChange = (e) => {
    this.setState({
      windMode: e.target.value,
    });
    request.put(`/api/room/${this.state.roomId}/wind`, {
      command: 'changeMode',
      mode: e.target.value,
    });
  };

  onWindSpeedChange = (e) => {
    this.setState({
      windSpeed: e.target.value,
    });
    console.log(e.target.value);
    console.log(e);
    request.put(`/api/room/${this.state.roomId}/wind`, {
      command: 'changeSpeed',
      speed: e.target.value,
    });
  };

  updateTargetTemp = (value) => {
    request.put(`/api/room/${this.state.roomId}/wind`, {
      command: 'changeTarget',
      targetTemp: value,
    });
  };

  onTargetTempChange = (value) => {
    this.setState({
      targetTemp: value,
    });
    this.updateTargetTemp(value);
  };

  getSpeedString = (speed) => {
    if (speed === 0) {
      return '低风';
    } else if (speed === 1) {
      return '中风';
    } else if (speed === 2) {
      return '高风';
    } else {
      return '未知';
    }
  };

  getStatusString = (status) => {
    if (status === 'off') {
      return '关机';
    } else if (status === 'serving') {
      return '正在运行';
    } else if (status === 'waiting') {
      return '等待调度';
    } else if (status === 'pause') {
      return '达温暂停';
    } else {
      return '未知';
    }
  };

  render() {
    const { targetTemp, roomStatus } = this.state;
    return (
      <div>
        <CustomBreadcrumb arr={['用户界面', '信息显示']} />
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Card>
              <Statistic title="用户名" value={isAuthenticated()} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="房间号" value={this.state.roomId} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前温度"
                value={roomStatus.curTemp}
                precision={2}
                valueStyle={{
                  color: this.state.rising ? red.primary : blue.primary,
                }}
                prefix={
                  <Icon type={this.state.rising ? 'arrow-up' : 'arrow-down'} />
                }
                suffix="℃"
              />
            </Card>
          </Col>
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
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前状态"
                value={this.getStatusString(roomStatus.status)}
                valueStyle={{ color: red.primary }}
                prefix={<Icon type="poweroff" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前模式"
                value={roomStatus.windMode === 'cooling' ? '制冷' : '制热'}
                valueStyle={{
                  color:
                    roomStatus.windMode === 'cooling'
                      ? blue.primary
                      : red.primary,
                }}
                prefix={<Icon type="fire" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前风速"
                value={this.getSpeedString(roomStatus.windSpeed)}
                valueStyle={{
                  color:
                    roomStatus.windMode === 'cooling'
                      ? blue.primary
                      : red.primary,
                }}
                prefix={<Icon type="loading" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="目标温度"
                value={roomStatus.targetTemp}
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
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  checked={this.state.checked}
                  onChange={async (checked, event) => {
                    await request.put(`/api/room/${this.state.roomId}/wind`, {
                      command: checked ? 'turnOn' : 'turnOff',
                    });
                  }}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                模式：
                <Radio.Group
                  value={this.state.windMode}
                  onChange={this.onWindModeChange}
                  buttonStyle="solid"
                >
                  <Radio.Button value="cooling">制冷</Radio.Button>
                  <Radio.Button value="heating">制热</Radio.Button>
                </Radio.Group>
              </div>

              <div style={{ marginTop: 16 }}>
                风速：
                <Radio.Group
                  value={this.state.windSpeed}
                  onChange={this.onWindSpeedChange}
                  buttonStyle="solid"
                >
                  <Radio.Button value={0}>低风</Radio.Button>
                  <Radio.Button value={1}>中风</Radio.Button>
                  <Radio.Button value={2}>高风</Radio.Button>
                </Radio.Group>
              </div>
              <div style={{ marginTop: 16 }}>
                目标温度：
                <Row>
                  <Col span={12}>
                    <Slider
                      min={roomStatus.windMode === 'cooling' ? 18 : 25}
                      max={roomStatus.windMode === 'cooling' ? 25 : 30}
                      onChange={this.onTargetTempChange}
                      value={targetTemp}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={roomStatus.windMode === 'cooling' ? 18 : 25}
                      max={roomStatus.windMode === 'cooling' ? 25 : 30}
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

export default ClientPanel;
