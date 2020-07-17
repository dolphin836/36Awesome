import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';

class Mail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <AccountLayout page="mail" title="邮件设置" subtitle="设置您的订阅等信息">
                
            </AccountLayout>
        );
    }
}

export default Mail;