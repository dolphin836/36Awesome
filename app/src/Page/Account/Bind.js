import React, { Component } from 'react';
import AccountLayout from '../../Component/AccountLayout';

class Bind extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <AccountLayout page="bind" title="账号管理" subtitle="您在 36Awesome 中使用的邮箱、手机等">
                
            </AccountLayout>
        );
    }
}

export default Bind;