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
                <div className="field">
                    <label className="label">老的密码</label>
                    <div className="control">
                        <input className="input" type="password" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">新的密码</label>
                    <div className="control">
                        <input className="input" type="password" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">确认密码</label>
                    <div className="control">
                        <input className="input" type="password" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-link">确 定</button>
                    </div>
                </div>
            </AccountLayout>
        );
    }
}

export default Password;