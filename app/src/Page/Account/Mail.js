import React, { Component, Fragment } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import AccountNav from '../../Component/AccountNav';

class Mail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Fragment>
                <AccountLayout></AccountLayout>
                <AccountNav page="mail">
                    Mail
                </AccountNav>
            </Fragment>
        );
    }
}

export default Mail;