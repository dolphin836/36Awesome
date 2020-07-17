import React from 'react';
import { Link } from 'react-router-dom';

function AccountNav (props) {
    return (
        <section className="section">
            <div className="container">
                <div className="tabs">
                    <ul>
                        <li className={ props.page === 'data' ? 'is-active' : '' }>
                            <Link to="/account/data">账户信息</Link>
                        </li>
                        <li className={ props.page === 'password' ? 'is-active' : '' }>
                            <Link to="/account/password">修改密码</Link>
                        </li>
                        <li className={ props.page === 'bind' ? 'is-active' : '' }>
                            <Link to="/account/bind">账号管理</Link>
                        </li>
                        <li className={ props.page === 'mail' ? 'is-active' : '' }>
                            <Link to="/account/mail">邮件设置</Link>
                        </li>
                    </ul>
                </div>
                { props.children }
            </div>
        </section>
    );
}

export default AccountNav;