import React from 'react'
import CustomMenu from "../../components/CustomMenu/index";

const menus = [
  {
    title: '住户管理',
    icon: 'laptop',
    key: '/f/user',
    subs: [
      {key: '/f/user/checkin', title: '入住', icon: '',},
      {key: '/f/user/checkout', title: '退房', icon: '',},
    ]
  },
  {
    title: '房间信息管理',
    icon: 'bars',
    key: '/f/information',
    subs: [
      {key: '/f/information/id', title: '查找房间号', icon: ''},
      {key: '/f/information/name', title: '查找住户名', icon: ''},
      {key: '/f/information/inf', title: '房间信息一览', icon: ''},
    ]
  },
  {
    title: '账单管理',
    icon: 'edit',
    key: '/f/check',
    subs: [
      {key: '/f/check/user', title: '个人账单打印', icon: ''},
      {key: '/f/check/hotel', title: '酒店账单打印', icon: ''}
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