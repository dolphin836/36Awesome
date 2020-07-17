import React, { Component, Fragment } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import AccountNav from '../../Component/AccountNav';

class Password extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Fragment>
                <AccountLayout></AccountLayout>
                <AccountNav page="password">
                    <div className="columns">
                        <div className="column box-sign">
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
                            <div className="field">
                                <button className="button is-link">保 存</button>
                            </div>
                        </div>
                    </div>
                </AccountNav>
            </Fragment>
        );
    }
}

export default Password;