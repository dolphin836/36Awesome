import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import { getMemberAvatar, getMemberName } from '../../Auth';
import { API } from '../../API';
import { FaPen } from "react-icons/fa";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: getMemberAvatar(),
       error: ''
    };

    this.avatarInput = React.createRef();
  }
  // 点击头像
  onAvatarClick = () => {
    this.avatarInput.current.click();
  }
  // 上传头像
  onAvatarUpload = async event => {
    event.preventDefault();
    //
    let formData = new FormData();

    formData.append('file', event.target.files[0])

    let config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    // 请求上传接口
    const response = await API.post(`/upload/avatar`, formData, config);
        
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
    // 更新头像
    this.setState({
      avatar: data.avatar
    });
  };

  render() {
    return (
      <AccountLayout page="account" title="个人信息" subtitle="您在 36Awesome 中使用的基本信息，例如您的姓名和头像">
        <div className="has-text-centered">
          <figure className="image is-128x128" style={{ margin: '0 auto' }}>
            <img className="is-rounded" src={ this.state.avatar } />
            <button onClick={ this.onAvatarClick } className="mt-4 button is-circle is-hidden"><FaPen size="12" /></button>
          </figure>
          <h3 className="pt-4 is-5">欢迎您，<strong>{ getMemberName() }</strong></h3>
          
          <input className="is-hidden" type="file" ref={ this.avatarInput } onChange={ this.onAvatarUpload } />

        </div>
      </AccountLayout>
    );
  }
}

export default Account;