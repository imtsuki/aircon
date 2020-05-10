import React from 'react';
import { Result, Button, notification } from 'antd';
import './App.css';

const App = () => (
  <div className="App">
    <Result
      status="success"
      title="分布式温控系统"
      subTitle="Hello, World!"
      extra={[
        <Button type="primary" key="console" onClick={openNotification}>
          Click me!
        </Button>,
      ]}
    />
  </div>
);

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

export default App;
