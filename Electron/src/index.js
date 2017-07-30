import React from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history'; // static app
import { Router } from 'react-router-dom'

import routes from './route/Route';


import './styles/App.css';
import './styles/MediumDraft.css';
import './helper/MediumDraft';

import injectTapEventPlugin from 'react-tap-event-plugin';

window.onload = () => {
	injectTapEventPlugin();
	render(
		<Router history={createHashHistory()}>
			{routes}
		</Router>,
		document.getElementById('app'))
}
