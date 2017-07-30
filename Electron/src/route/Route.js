import React from 'react';
import { Route, Switch } from 'react-router-dom'

import App from '../components/App';
import Splash from '../components/Splash';
import Home from '../components/Home';
import Edit from '../components/Edit';
import Setting from '../components/Setting';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default (
	<MuiThemeProvider>
		<App>
			<Switch>
				<Route exact path="/" component={Splash} />
				<Route path="/home" component={Home} />
				<Route path="/edit" component={Edit} />
				<Route path="/setting" component={Setting} />
			</Switch>
		</App>
	</MuiThemeProvider>
);