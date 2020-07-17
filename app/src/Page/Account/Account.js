import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <AccountLayout page="account" title="个人信息" subtitle="您在 36Awesome 中使用的基本信息，例如您的姓名和头像">
        
      </AccountLayout>
    );
  }
}

export default Account;