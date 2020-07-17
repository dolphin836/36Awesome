import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class CommonError extends Component {
    constructor(props) {
        super(props);

        this.state = {
            second: 0,
            isHide: true
        };
    }

    // 页面加载完成，创建时钟
    componentDidMount() {
        this.clock = setInterval(
            () => this.running(),
            1000
        );
    }

    // 注销页面，清除时钟
    componentWillUnmount() {
        clearInterval(this.clock);
    }

    // 手动更新 state
    componentWillReceiveProps (props) {
        if (props.message === '') {
            return false;
        }

        console.log(props);

        this.setState({
            second: 0,
            isHide: false
        });
    }

    // 时钟
    running() {
        this.setState({
            second: this.state.second + 1
        });
        
        if (this.state.second >= 3) {
            this.setState({
                isHide: true
            });
        }
    }

    render() {
        if (this.state.isHide) {
            return (
                <Fragment></Fragment>
            );
        } else {
            return (
                <div className="notification is-danger is-common-error">
                    { this.props.message }
                </div>
            );
        }
    }
}

CommonError.propTypes = {
    message: PropTypes.string
};

export default CommonError;