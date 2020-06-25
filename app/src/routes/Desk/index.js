import React from 'react';
import { Layout } from 'antd';
import SiderNav from '../../desk/SiderNav/index';
import ContentMain from '../../desk/ContentMain/index';
import HeaderBar from '../../components/HeaderBar/index';

const { Sider, Header, Content, Footer } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    // console.log(this)  状态提升后，到底是谁调用的它
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    // 设置Sider的minHeight可以使左右自适应对齐
    return (
      <div id="page">
        <Layout>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
            <SiderNav />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <HeaderBar
                collapsed={this.state.collapsed}
                onToggle={this.toggle}
              />
            </Header>
            <Content>
              <ContentMain />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Copyright©2020 All Right Reserved-前台界面{' '}
              <a target="_blank" href="https://github.com/imtsuki/aircon">
                github地址
              </a>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Index;
