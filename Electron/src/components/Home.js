
import React, { Component } from 'react';
import Fluxify from 'fluxify';
import { Link } from 'react-router-dom';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/perm-data-setting';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import { getAll } from '../helper/Database';
import { getCreatedOn, getDateTime, } from '../helper/Collection'
import { PRICOLOR } from '../helper/Constant'
import { Type } from '../enum/Type';
import Store from '../store/Store';

import Task from './partialView/Task';
import Note from './partialView/Note';
import Empty from './partialView/Empty';

const contextTypes = {
	notes: React.PropTypes.array,
	tasks: React.PropTypes.array,
};


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Note',
			appTitle: 'Notes',
			isMounted: false,
			isDrawerOpen: false
		};

		this.renderView = this.renderView.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.openSettings = this.openSettings.bind(this);
		this.onAddClick = this.onAddClick.bind(this);
		this.loadItems = this.loadItems.bind(this);
	}

	componentWillMount() {
		this.setState({ isMounted: true });
	}

	componentWillUnmount() {
		this.setState({ isMounted: false });
	}

	componentDidMount() {
		this.onMenuItemClick(Store.title);
		this.state.isMounted && this.setState({ title: Store.title });
		this.loadItems();
	}

	loadItems() {
		getAll((data) => {
			if (!data.error) {
				const tasks = data.result.filter(x => x.type == Type.TASK).sort((a, b) => a.modifiedOn > b.modifiedOn).slice();
				//for now focus on note only
				const notes = data.result.filter(x => x.type == Type.TASK).sort((a, b) => a.modifiedOn > b.modifiedOn).slice();
				Fluxify.doAction("updateNotes", notes)
				Fluxify.doAction("updateTasks", tasks)
			}
		});
	}

	renderView() {
		const { title } = this.state
		const { notes, tasks } = this.context
		if (title === Type.NOTE) {
			if(notes.length > 0){
				return <Note notes={this.context.notes} />
			}
			return <Empty message={"It's empty in here, try creating a new note."}/>
		} else if (title === Type.TASK) {
			if(tasks.length > 0){
				return <Task tasks={this.context.tasks} />
			}
			return <Empty message={"It's empty in here, try creating a new task."}/>
		} else {
			return null;
		}
	}

	handleToggle(e) {
		this.setState({ open: !this.state.open });
	}

	onMenuItemClick(code) {
		this.setState({ open: false });
		if (code === Type.NOTE) {
			this.setState({ title: code });
			Fluxify.doAction('updateTitle', code)
		} else if (code === Type.TASK) {
			this.setState({ title: code });
			Fluxify.doAction('updateTitle', code)
		} else if (code === Type.RATE) {

		} else {

		}
	}

	openSettings() {
		this.props.history.push('./setting');
	}

	onAddClick(e) {
		this.props.history.push('./edit');
	}

	render() {
		return (
			<div>
				<AppBar
					title={this.state.appTitle}
					style={{ background: PRICOLOR, position: 'fixed' }}
					iconElementRight={<IconButton iconClassName="material-icons" tooltip="Settings">settings</IconButton>}
					onLeftIconButtonTouchTap={this.handleToggle}
					onRightIconButtonTouchTap={this.openSettings}
					iconStyleLeft={{ 'backgroud': 'transparent !important' }} />

				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}>
					<div style={{
						height: 64, width: '100%', background: PRICOLOR, display: 'flex',
						flex: 1, alignItems: 'center', paddingLeft: 16, paddingRight: 16
					}}>
						<h1 style={{
							margin: 0, color: 'white',
							fontSize: 24, fontWeight: 400,
						}}>Airnotes</h1>
					</div>
					<Divider />
					<MenuItem onTouchTap={() => this.onMenuItemClick('Share')}>Share this app</MenuItem>
					<MenuItem onTouchTap={() => this.onMenuItemClick('Rate')}>Rate this app</MenuItem>
				</Drawer>
				<div style={{ paddingTop: 64, paddingBottom: 16 }}>
					{
						this.renderView()
					}
				</div>
				<FloatingActionButton style={{ right: 16, bottom: 16, position: 'fixed' }} backgroundColor={PRICOLOR}
					onTouchTap={this.onAddClick}>
					<AddIcon />
				</FloatingActionButton>
			</div>
		)
	}
}

Home.contextTypes = contextTypes;

export default Home
