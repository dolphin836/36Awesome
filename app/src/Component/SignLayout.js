// 注册、登录页公共模版
import React from 'react';

function SignLayout (props) {
    return (
        <section className="hero is-fullheight is-vcentered is-primary">
            <div className="hero-body">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <div className="box box-sign">
                                { props.children }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignLayout;