import React, { Component } from 'react';
const shell = require('electron').shell


import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import { PRICOLOR } from '../helper/Constant'

class Settings extends Component {

	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	componentWillMount() {

	}


	componentWillUnmount() {

	}

	componentDidMount() {

	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		return (
			<div className="setting-base-div">
				<AppBar
					title="Settings"
					style={{ background: PRICOLOR, position: 'fixed' }}
					iconElementLeft={<IconButton><BackIcon /></IconButton>}
					onLeftIconButtonTouchTap={this.goBack}
					iconStyleLeft={{ 'backgroud': 'transparent !important' }} />

				<div style={{ padding: 16, paddingTop: 80 }}>
					<Card>
						<CardText>
							<Toggle
								disabled={true}
								toggled={true}
								label="Accept Privacy Policy."
							/>
						</CardText>
						<Divider />
						<CardText>
							Airnote is simple note and task taking app.
							<br />
							Airnote is built over electron + react for desktop and react native for android.
							<p></p>
							<Divider />
							<br />
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/HubSpot/draft-convert")
							}}> ayush.as.shukla@gmail.com </a>
							<br />
							<p />
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/mcd-50/Airnotes")
							}}> Source code on github </a>
						</CardText>
					</Card>
					<Card style={{ marginTop: 16 }}>
						<CardText>
							Support the development of  Airnotes. Paypal Airnotes
						</CardText>
						<Divider />
						<CardText>
							<a style={{ color: PRICOLOR, cursor: 'pointer' }}> Buy coffee for developer </a>
						</CardText>
					</Card>

					<Card style={{ marginTop: 16 }}>
						<CardText>
							Keyboard shortcuts
						</CardText>
						<Divider />
						<CardText>
							(Ctrl + 1) - Toggle ordered list
							<br />
							<p />
							(Ctrl + *) - Toggle unordered list
							<br />
							<p />
							(Ctrl + #) - Toggle header
							<br />
							<p />
							(Ctrl + &lt;) - Toggle caption
							<br />
							<p />
							(Ctrl + &gt;) - Toggle unstyled or paragraph
							<br />
							<p />
							(Ctrl + H) - Highlight selection
						</CardText>
					</Card>

					<Card style={{ marginTop: 16 }}>
						<CardText>
							Libraries used in Airnotes
						</CardText>
						<Divider />
						<CardText>
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/arqex/fluxify")
							}}> Fluxify </a>
							<br />
							<p />
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/brijeshb42/medium-draft")
							}}> Medium Draft </a>
							<br />
							<p />
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/louischatriot/nedb")
							}}> NeDB </a>
							<br />
							<p />
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/HubSpot/draft-convert")
							}}> Draft Convert </a>
							<br />
							<p />
							<a style={{ color: PRICOLOR, cursor: 'pointer' }} onClick={() => {
								shell.openExternal("https://github.com/facebook/draft-js")
							}}> Draft JS </a>
						</CardText>
					</Card>

					<p style={{
						textAlign: 'right',
						color: '#737373', fontSize: 13, fontFamily: 'Roboto, sans-serif'
					}}> Airnotes 1.2 </p>

				</div>
			</div>);
	}
}



export default Settings
