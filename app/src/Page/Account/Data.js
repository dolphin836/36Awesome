import React, { Component, Fragment } from 'react';
import AccountLayout from '../../Component/AccountLayout';
import AccountNav from '../../Component/AccountNav';

class Data extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Fragment>
                <AccountLayout></AccountLayout>
                <AccountNav page="data">
                    Data
                </AccountNav>
            </Fragment>
        );
    }
}

export default Data;