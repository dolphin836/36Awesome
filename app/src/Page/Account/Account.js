import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import Avatar from '../../Assent/Image/default-avatar.png';
import { FaAdobe } from "react-icons/fa";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <AccountLayout page="account" title="个人信息" subtitle="您在 36Awesome 中使用的基本信息，例如您的姓名和头像">
        <div className="has-text-centered">
          <figure className="image is-128x128" style={{ margin: '0 auto' }}>
            <img className="is-rounded" src={ Avatar } />
          </figure>
          <h3 className="pt-2 is-6">欢迎您，<strong>海兵大侠</strong></h3>
          <h3 className="pt-2 is-6">您最近一次登录时间 2020-07-17 12:00:00</h3>
          <FaAdobe />
          <FilePond allowMultiple={true} maxFiles={3} server='/api'/>
        </div>
      </AccountLayout>
    );
  }
}

export default Account;