import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import NewEventPage from './components/NewEventPage';

import requireAuth from './utils/requireAuth';

export default (
	<Route path="/" component={App} >
		<IndexRoute component={Greetings} />
		<Route path="signup" component={SignupPage}/>
		<Route path="login" component={LoginPage}/>
		<Route path="new-event" component={requireAuth(NewEventPage)} />
	</Route>
)