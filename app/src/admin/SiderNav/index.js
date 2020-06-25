import React from 'react'
import CustomMenu from "../../components/CustomMenu/index";

const menus = [
  {
    title: '管理员界面',
    icon: 'laptop',
    key: '/a',
    subs: [
      {
        key: '/a/host',
        title: '主控机界面',
        icon: '',
        subs: [
          {key: '/a/host/change', title: '主控机调整', icon: ''},
          {key: '/a/host/information', title: '主控机信息', icon: ''}
        ]
      },
      {key: '/a/slave', title: '从控机信息', icon: '',},
    ]
  }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav