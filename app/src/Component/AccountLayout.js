// 注册、登录页公共模版
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../API';
import { isAuthenticated } from '../Auth';
import Avatar from '../Assent/Image/default-avatar.png';

class AccountLayout extends Component {
    constructor(props) {
        super(props);
    
        if (! isAuthenticated()) {
            this.props.history.push("/signin");
        }

        this.state = {
            isActive: false
        };
    }

    // 退出
    signOut = (e) => {
        // 更新 Token
        signOut();
        // 跳转主页
        this.props.history.push("/signin");
    };

    // 菜单
    navClick = (e) => {
        this.setState({
            isActive: ! this.state.isActive
        });
    };

    render() {
        return (
            <Fragment>
                {/* <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt=""/>
                        </Link>

                        <a role="button" onClick={ this.navClick } className={ this.state.isActive ? 'navbar-burger burger is-active' : 'navbar-burger burger' } aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu' }>
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">菜单导航一</Link>
                            <Link to="/" className="navbar-item">菜单导航二</Link>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link is-arrowless">
                                    <figure className="image is-32x32">
                                        <img className="is-rounded" src={ Avatar } />
                                    </figure>
                                </a>
                                <div className="navbar-dropdown is-right">
                                    <Link to="/account/data" className="navbar-item">账户信息</Link>
                                    <Link to="/account/password" className="navbar-item">修改密码</Link>
                                    <Link to="/account/bind" className="navbar-item">账号管理</Link>
                                    <Link to="/account/mail" className="navbar-item">邮件设置</Link>
                                    <hr className="navbar-divider" />
                                    <a className="navbar-item" onClick={ this.signOut }>退 出</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav> */}

                <section className="section py-3 px-3">
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <div className="level-item">
                                <Link to="/">
                                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt=""/>
                                </Link>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <figure className="image is-32x32">
                                    <img className="is-rounded" src={ Avatar } />
                                </figure>
                            </div>
                        </div>
                    </nav>
                </section>

                <div className="columns">
                    <div className="column is-one-quarter">
                        <section className="section pl-0 pt-4">
                            <aside className="menu">
                                <ul className="menu-list">
                                    <li><Link className="pl-5 py-3 is-active" to="/account/data">账户信息</Link></li>
                                    <li><Link className="pl-5 py-3" to="/account/password">修改密码</Link></li>
                                    <li><Link className="pl-5 py-3" to="/account/bind">账号管理</Link></li>
                                    <li><Link className="pl-5 py-3" to="/account/mail">邮件设置</Link></li>
                                </ul>
                            </aside>
                        </section>
                    </div>
                    <div className="column">
                        <section className="section pt-4">
                            Content
                        </section>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AccountLayout;