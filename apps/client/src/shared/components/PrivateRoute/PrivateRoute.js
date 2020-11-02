import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userStore from 'shared/store/userStore';
import SpinnerArea from '../Spinner/SpinnerArea';

const PrivateRoute = (props) => {
	const { isAuth, loading } = userStore();

	if (loading) {
		return <SpinnerArea />;
	}

	if (!isAuth) {
		return <Redirect to="/login" />;
	}
	return <Route {...props} />;
};

export default PrivateRoute;