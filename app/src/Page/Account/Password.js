import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';

class Password extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <AccountLayout page="password" title="修改密码" subtitle="为了确保您的账号安全，建议定期更新密码">

            </AccountLayout>
        );
    }
}

export default Password;