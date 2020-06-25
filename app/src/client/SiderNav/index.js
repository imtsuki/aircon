import React from 'react';
import CustomMenu from '../../components/CustomMenu/index';

const menus = [
  {
    title: '客户界面',
    icon: 'edit',
    key: '/client',
    subs: [
      {
        key: '/client/change',
        title: '空调使用',
        icon: '',
        subs: [
          { key: '/client/change/changewind', title: '风速调整', icon: '' },
          { key: '/client/change/changetem', title: '温度调整', icon: '' },
        ],
      },
      { key: '/client/information', title: '信息显示', icon: '' },
    ],
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
