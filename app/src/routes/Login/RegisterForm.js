import React from 'react';
import { Form, Input, Select, message, notification } from 'antd';
import { inject, observer } from 'mobx-react/index';
import { calculateWidth } from '../../utils/utils';
import request from '../../utils/request';
import PromptBox from '../../components/PromptBox';

const { Option } = Select;

@inject('appStore')
@observer
@Form.create()
class RegisterForm extends React.Component {
  state = {
    focusItem: -1,
  };
  registerSubmit = (e) => {
    e.preventDefault();
    this.setState({
      focusItem: -1,
    });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          let response = await request.post('/register', {
            username: values.registerUsername,
            password: values.registerPassword,
            role: values.role,
          });
          console.log(response);
          message.success('注册成功');
        } catch (e) {
          console.log(e);
          message.error('注册失败');
          notification.error({
            message: `注册失败`,
            description: e.message,
          });
        }
      }
    });
  };
  gobackLogin = () => {
    this.props.switchShowBox('login');
    setTimeout(() => this.props.form.resetFields(), 500);
  };

  render() {
    const { getFieldDecorator, getFieldError, getFieldValue } = this.props.form;
    const { focusItem } = this.state;
    return (
      <div className={this.props.className}>
        <h3 className="title">新客户注册</h3>
        <Form onSubmit={this.registerSubmit}>
          <Form.Item
            help={
              getFieldError('registerUsername') && (
                <PromptBox
                  info={getFieldError('registerUsername')}
                  width={calculateWidth(getFieldError('registerUsername'))}
                />
              )
            }
          >
            {getFieldDecorator('registerUsername', {
              validateFirst: true,
              rules: [
                { required: true, message: '用户名不能为空' },
                { pattern: '^[^ ]+$', message: '不能输入空格' },
              ],
            })(
              <Input
                onFocus={() => this.setState({ focusItem: 0 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                maxLength={16}
                placeholder="用户名"
                addonBefore={
                  <span
                    className="iconfont icon-User"
                    style={focusItem === 0 ? styles.focus : {}}
                  />
                }
              />
            )}
          </Form.Item>

          <Form.Item
            help={
              getFieldError('registerPassword') && (
                <PromptBox
                  info={getFieldError('registerPassword')}
                  width={calculateWidth(getFieldError('registerPassword'))}
                />
              )
            }
          >
            {getFieldDecorator('registerPassword', {
              validateFirst: true,
              rules: [
                { required: true, message: '密码不能为空' },
                { pattern: '^[^ ]+$', message: '密码不能有空格' },
              ],
            })(
              <Input
                onFocus={() => this.setState({ focusItem: 1 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                type="password"
                maxLength={16}
                placeholder="密码"
                addonBefore={
                  <span
                    className="iconfont icon-suo1"
                    style={focusItem === 1 ? styles.focus : {}}
                  />
                }
              />
            )}
          </Form.Item>
          <Form.Item
            help={
              getFieldError('confirmPassword') && (
                <PromptBox
                  info={getFieldError('confirmPassword')}
                  width={calculateWidth(getFieldError('confirmPassword'))}
                />
              )
            }
          >
            {getFieldDecorator('confirmPassword', {
              validateFirst: true,
              rules: [
                { required: true, message: '请确认密码' },
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== getFieldValue('registerPassword')) {
                      callback('两次输入不一致！');
                    }
                    callback();
                  },
                },
              ],
            })(
              <Input
                onFocus={() => this.setState({ focusItem: 2 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                type="password"
                maxLength={16}
                placeholder="确认密码"
                addonBefore={
                  <span
                    className="iconfont icon-suo1"
                    style={focusItem === 2 ? styles.focus : {}}
                  />
                }
              />
            )}
          </Form.Item>
          <Form.Item
            help={
              getFieldError('role') && (
                <PromptBox
                  info={getFieldError('role')}
                  width={calculateWidth(getFieldError('role'))}
                />
              )
            }
          >
            {getFieldDecorator('role', {
              validateFirst: true,
              rules: [{ required: true, message: '必须选择一个角色' }],
            })(
              <Select
                placeholder="选择角色"
                onChange={this.onGenderChange}
                onFocus={() => this.setState({ focusItem: 3 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                allowClear
              >
                <Option value="client">客户</Option>
                <Option value="desk">前台</Option>
                <Option value="manager">酒店经理</Option>
                <Option value="admin">管理员</Option>
              </Select>
            )}
          </Form.Item>
          <div className="bottom">
            <input className="loginBtn" type="submit" value="注册" />
            <span className="registerBtn" onClick={this.gobackLogin}>
              返回登录
            </span>
          </div>
        </Form>
        <div className="footer">
          <div>Copyright©2020 All Right Reserved</div>
        </div>
      </div>
    );
  }
}

const styles = {
  focus: {
    width: '20px',
    opacity: 1,
  },
};

export default RegisterForm;
