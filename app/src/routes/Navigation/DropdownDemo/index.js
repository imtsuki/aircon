import React from 'react'
import {Card, Menu, Row, Col, Dropdown, Icon, message, Button} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'


class DropdownDemo extends React.Component {
  handleMenuClick(e) {
    message.info(`Click on menu ${e.key} item.`)
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    )
    const menu2 = (
      <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <Menu.SubMenu title="sub menu">
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="disabled sub menu" disabled>
          <Menu.Item>5d menu item</Menu.Item>
          <Menu.Item>6th menu item</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
    return (
      <div>
        <CustomBreadcrumb arr={['客户界面','空调使用']}/>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false} className='card-item' title='风速调整'>
              <Dropdown overlay={menu}><Button>Button<Icon type='down'/></Button></Dropdown>&emsp;
              <div>
              <Dropdown overlay={menu} placement="topRight"><Button>确定</Button></Dropdown>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} className='card-item' title='温度调整'>
              <Dropdown overlay={menu2}><a href="">Cascading menu <Icon type="down"/></a></Dropdown>&emsp;&emsp;
              <Dropdown overlay={menu2}><Button>Cascading menu <Icon type="down"/></Button></Dropdown>
              <div>
              <Dropdown overlay={menu} placement="topRight"><Button>确定</Button></Dropdown>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DropdownDemo