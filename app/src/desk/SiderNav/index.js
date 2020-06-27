import React from 'react';
import CustomMenu from '../../components/CustomMenu/index';

const menus = [
  {
    title: '住户管理',
    icon: 'laptop',
    key: '/desk/user',
    subs: [
      { key: '/desk/user/checkin', title: '入住', icon: '' },
      { key: '/desk/user/checkout', title: '退房', icon: '' },
    ],
  },
  {
    title: '房间信息管理',
    icon: 'bars',
    key: '/desk/information',
    subs: [
      { key: '/desk/information/id', title: '查找房间号', icon: '' },
      { key: '/desk/information/name', title: '查找住户名', icon: '' },
      { key: '/desk/information/inf', title: '房间信息一览', icon: '' },
    ],
  },
  {
    title: '账单管理',
    icon: 'edit',
    key: '/desk/check',
    subs: [{ key: '/desk/check/user', title: '账单详单打印', icon: '' }],
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
