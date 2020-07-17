import React, { Component, Fragment } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import AccountNav from '../../Component/AccountNav';

class Bind extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Fragment>
                <AccountLayout></AccountLayout>
                <AccountNav page="bind">
                    Bind
                </AccountNav>
            </Fragment>
        );
    }
}

export default Bind;