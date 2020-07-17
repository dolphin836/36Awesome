import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from './Auth';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated()
                ? 
                <Component {...rest} {...props} />
                :
                <Redirect to='/signin' />
            }
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
}

export default PrivateRoute