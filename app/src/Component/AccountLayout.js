// 注册、登录页公共模版
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut } from '../API';
import { isAuthenticated, getMemberAvatar } from '../Auth';
import Footer from './Footer';

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
            <div className="awesome">
                <div className="app">
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
                                <div className="level-item dropdown is-hoverable is-right">
                                    <div className="dropdown-trigger">
                                        <figure className="image is-32x32">
                                            <img className="is-rounded" src={ getMemberAvatar() } />
                                        </figure>
                                    </div>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            <a onClick={ this.signOut } className="dropdown-item">退 出</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </section>
                    <div className="columns">
                        <div className="column is-one-quarter">
                            <section className="section pl-0 pt-4 is-hidden-mobile" style={{ marginBottom: '-18rem' }}>
                                <aside className="menu">
                                    <ul className="menu-list">
                                        <li><Link className={ this.props.page === 'account' ? 'pl-5 py-3 is-active' : 'pl-5 py-3'} to="/account">账户信息</Link></li>
                                        <li><Link className={ this.props.page === 'password' ? 'pl-5 py-3 is-active' : 'pl-5 py-3'} to="/account/password">修改密码</Link></li>
                                        <li><Link className={ this.props.page === 'bind' ? 'pl-5 py-3 is-active' : 'pl-5 py-3'} to="/account/bind">账号管理</Link></li>
                                        <li><Link className={ this.props.page === 'mail' ? 'pl-5 py-3 is-active' : 'pl-5 py-3'} to="/account/mail">邮件设置</Link></li>
                                    </ul>
                                </aside>
                            </section>
                            <section className="section py-4 is-hidden-tablet">
                                <div className="tabs">
                                    <ul>
                                        <li className={ this.props.page === 'account' ? 'is-active' : ''}><Link to="/account">账户信息</Link></li>
                                        <li className={ this.props.page === 'password' ? 'is-active' : ''}><Link to="/account/password">修改密码</Link></li>
                                        <li className={ this.props.page === 'bind' ? 'is-active' : ''}><Link to="/account/bind">账号管理</Link></li>
                                        <li className={ this.props.page === 'mail' ? 'is-active' : ''}><Link to="/account/mail">邮件设置</Link></li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                    <section className="section pt-0" style={{ marginTop: '-1rem' }}>
                        <div className="has-text-centered">
                            <h1 className="title is-3 pb-2 has-text-title">{ this.props.title }</h1>
                            <h2 className="subtitle is-6 has-text-subtitle">{ this.props.subtitle }</h2>
                        </div>
                        <div className="columns">
                            <div className="column is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop is-4-widescreen is-offset-4-widescreen">
                                <section className="section">
                                    { this.props.children }
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(AccountLayout);