import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import { getMemberAvatar, getMemberName } from '../../Auth';
import { FaPen } from "react-icons/fa";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
  }

  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }

  render() {
    return (
      <AccountLayout page="account" title="个人信息" subtitle="您在 36Awesome 中使用的基本信息，例如您的姓名和头像">
        <div className="has-text-centered">
          <figure className="image is-128x128" style={{ margin: '0 auto' }}>
            <img className="is-rounded" src={ getMemberAvatar() } />
          </figure>
          <h3 className="pt-4 is-5"><strong>{ getMemberName() }</strong></h3>
          <h3 className="is-7">dolphin</h3>
          <h3 className="pt-4 is-7">故君子和而不流，强哉矫！中立而不倚，强哉矫！国有道，不变塞焉，强哉矫！国无道，至死不变，强哉矫！</h3>

          {/* <button className="mt-4 button is-link">编 辑</button> */}
          <button className="mt-4 button is-circle"><FaPen /></button>
        </div>
      </AccountLayout>
    );
  }
}

export default Account;