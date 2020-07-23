import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { API, signIn } from '../API';
import { isAuthenticated } from '../Auth';
import CommonError from '../Component/CommonError';
import SignLayout from '../Component/SignLayout';

class SignIn extends Component {
  constructor(props) {
    super(props);

    if (isAuthenticated()) {
      this.props.history.push("/account");
    }

    this.state = {
         username: '',
         password: '',
            error: '',
      commonError: ''
    };
  }
  // 输入用户名
  usernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  };
  // 输入密码
  passwordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };
  // 登录
  signIn = async event => {
    event.preventDefault();

    let body = {
      username: this.state.username,
      password: this.state.password
    };

    try {
      const response = await API.post(`/signin`, body);
        
      let json = response.data;

      if (json.code != 0) {
        // 设置错误信息
        this.setState({
          error: json.message
        });

        return;
      }
      // 取出数据
      let data = json.data;
      // 数据格式校验
      if (! data.hasOwnProperty('member') || ! data.hasOwnProperty('token')) {
        // 设置通用错误信息
        this.setState({
          commonError: 'Data Error'
        });

        return;
      }
      // 重置错误信息
      this.setState({
              error: '',
        commonError: ''
      });
      // 更新 Token
      signIn(data);
      // 跳转主页
      this.props.history.push("/account");
    } catch (error) {

    }
  };

  render() {
    return (
      <Fragment>
        <SignLayout>
          <div className="field">
            <label className="label">用户名</label>
            <div className="control">
              <input className="input" type="text" value={ this.state.username } onChange={ this.usernameChange } />
            </div>
          </div>
          <div className="field">
            <label className="label">密 码</label>
            <div className="control">
              <input className="input" type="password" value={ this.state.password } onChange={ this.passwordChange } />
            </div>
            <p className="help is-danger">{ this.state.error }</p>
          </div>
          <div className="field">
            <button className="button is-link is-fullwidth" onClick={ this.signIn }>登 录</button>
          </div>
          <nav className="level">
            <div className="level-item has-text-centered">
              没有账号？请<Link to="/signup">注册</Link>
            </div>
          </nav>
        </SignLayout>
        <CommonError message={ this.state.commonError } />
      </Fragment>
    );
  }
}

export default SignIn;