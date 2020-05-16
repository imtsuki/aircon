import React from 'react';
import { Row, Col, Layout, Result } from 'antd';
import Login from '../components/Login';

const { Content } = Layout;

const Home = () => (
  <>
    <Layout>
      <Content>
        <Result status="success" title="分布式温控系统" />
        <Row>
          <Col span={6} offset={9}>
            <Login />
          </Col>
        </Row>
      </Content>
    </Layout>
  </>
);

export default Home;
