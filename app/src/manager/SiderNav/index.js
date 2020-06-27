import React from 'react';
import CustomMenu from '../../components/CustomMenu/index';

const menus = [
  {
    title: '经理界面',
    icon: 'laptop',
    key: '/manager',
    subs: [{ key: '/manager/print', title: '报表打印', icon: '' }],
  },
];

class SiderNav extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh', overflowY: 'scroll' }}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus} />
      </div>
    );
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px',
  },
};

export default SiderNav;
