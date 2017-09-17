

import React, { Component } from 'react';
import Fluxify from 'fluxify';

import { EditorState, ContentState, CompositeDecorator } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor as MediumEditor, findLinkEntities, Link as MediumLink } from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DropIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


import { getCreatedOn, getDateTime, getKey } from '../helper/Collection';
import { add, update, deleteOne } from '../helper/Database';
import { BLOCK_BUTTONS, INLINE_BUTTONS, NOTE_TYPE } from '../helper/Constant';
import { PRICOLOR } from '../helper/Constant'
import { Type } from '../enum/Type';
import Store from '../store/Store';


const decorator = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: MediumLink,
	},
]);



class Edit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			item: null,
			itemType: 'Task',//Store.title,
			html: '',
			text: '',
			title: getCreatedOn(getDateTime()),
			deleteConfirmOpen: false,
			datePickerOpen: false,
			editorState: this.setEditorSate('Loading...'),

			taskType: NOTE_TYPE[0],
			noteTag: NOTE_TYPE[0],
			endsIn: 'Deadline not specified.',
		};

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
		this.setEditorSate = this.setEditorSate.bind(this);
		this.popToHome = this.popToHome.bind(this);
		this.onBackPressed = this.onBackPressed.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.onPickerTouched = this.onPickerTouched.bind(this);
		this.onDateSelected = this.onDateSelected.bind(this);
		this.onDeleteTouched = this.onDeleteTouched.bind(this);
		this.onOptionSelected = this.onOptionSelected.bind(this);
	}

	componentDidMount() {
		const location = this.props.location.state;
		const item = location && location.item || null;

		if (item) {
			this.setState({
				editorState: this.setEditorSate(item.html),
				item: item,
				itemType: item.type,
				html: item.html,
				text: item.text,
				title: item.title,
				noteTag: item.noteTag,
				taskType: item.taskType,
				endsIn: item.endsIn
			});
		} else {
			this.setState({ editorState: this.setEditorSate('') });
		}
	}

	onDeleteConfirm() {
		deleteOne({ _id: this.state.item._id }, (data) => {
			this.popToHome();
		});
	}

	popToHome() {
		this.props.history.goBack();
	}

	setEditorSate(text) {
		return EditorState.createWithContent(stateFromHTML(text), decorator)
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState: editorState,
			html: mediumDraftExporter(editorState.getCurrentContent()),
			text: editorState.getCurrentContent().getPlainText() || ''
		});
	}

	onBackPressed() {
		const { item, title, html, text, itemType, noteTag, taskType, endsIn } = this.state;
		const dateTime = getDateTime();
		if (item && text.trim() != '') {
			update({ _id: item._id }, {
				$set: {
					title: getCreatedOn(dateTime),
					html: html,
					text: text,
					modifiedOn: dateTime,
					type: itemType,
					noteTag: noteTag,
					taskType: taskType,
					endsIn: endsIn,
				}
			}, (data) => {
				this.popToHome();
			});
		} else if (item && text.trim() == '') {
			deleteOne({ _id: item._id }, (data) => {
				this.popToHome();
			});
		} else if (item == null && text.length > 0) {
			add({
				title: getCreatedOn(dateTime),
				html: html,
				text: text,
				modifiedOn: dateTime,
				userId: 1,
				type: itemType,
				noteTag: noteTag,
				taskType: taskType,
				endsIn: endsIn,
			}, (data) => {
				this.popToHome();
			});
		} else {
			this.popToHome();
		}
	}

	handleSelectChange(e, i) {
		if (this.state.itemType == Type.TASK) {
			this.setState({ taskType: i.props.primaryText, noteTag: '' });
		} else {
			this.setState({ noteTag: i.props.primaryText, taskType: '' });
		}
	};

	onDeleteTouched() {
		const { item } = this.state;
		if (item) {
			this.setState({ deleteConfirmOpen: true });
		}
	}

	onOptionSelected() {
		this.setState({ deleteConfirmOpen: false, datePickerOpen: false });
	}

	onPickerTouched(e) {
		this.setState({ datePickerOpen: true });
	}

	onDateSelected(e, date) {
		date = date.toString().split(' ');
		const _date = date[2] + ' ' + date[1] + ', ' + date[3];
		this.setState({ endsIn: `Ends by ${_date}` })
	}

	render() {
		const _x = NOTE_TYPE;
		return (
			<div>
				<Toolbar style={{
					paddingLeft: 8, paddingRight: 8, height: 64,
					alignItems: 'center', zIndex:100, position: 'fixed', width: '100%', backgroundColor: PRICOLOR
				}}>
					<ToolbarGroup>
						<IconButton onTouchTap={this.onBackPressed} iconStyle={{ color: 'white' }} ><BackIcon /></IconButton>
						<h1 style={{ marginLeft: 8, marginRight: 8, fontSize: 24, fontFamily: 'Roboto, sans-serif', fontWeight: 400, color: 'white' }}>
							{this.state.title}
						</h1>
					</ToolbarGroup>

					<ToolbarGroup>
						{
							this.state.itemType == Type.TASK ?
								<IconButton iconClassName="material-icons" tooltip="Date" onTouchTap={this.onPickerTouched} iconStyle={{ color: 'white' }}> date_range </IconButton>
								: ''
						}
						{
							this.state.item
								? <IconButton iconClassName="material-icons" tooltip="Delete" onTouchTap={this.onDeleteTouched} iconStyle={{ color: 'white' }}> delete </IconButton>
								: ''
						}
						<IconMenu
							iconStyle={{ color: 'white' }}
							iconButtonElement={
								<IconButton iconClassName="material-icons" tooltip="Tag">more_vert</IconButton>}
							anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
							targetOrigin={{ horizontal: 'left', vertical: 'top' }}
							onItemTouchTap={this.handleSelectChange}>
							{
								_x.map(x => <MenuItem key={x} primaryText={x} />)
							}
						</IconMenu>
					</ToolbarGroup>
				</Toolbar>

				<div style={{ maxWidth: 750, margin: 'auto', paddingTop: 64, paddingBottom: 16, fontFamily: 'Roboto, sans-serif', }}>
					<MediumEditor
						ref="medium_editor"
						placeholder="Start typing from here..."
						spellCheck={true}
						style={{ fontFamily: 'Roboto, sans-serif' }}
						blockButtons={BLOCK_BUTTONS}
						inlineButtons={INLINE_BUTTONS}
						sideButtons={[]}
						editorState={this.state.editorState}
						onChange={this.onEditorStateChange} />

				</div>
				<Dialog
					actions={[
						<FlatButton
							label="Cancel"
							primary={true}
							onTouchTap={this.onOptionSelected}
						/>,
						<FlatButton
							label="Ok"
							primary={true}
							onTouchTap={this.onDeleteConfirm}
						/>,
					]}
					modal={false}
					open={this.state.deleteConfirmOpen}
					onRequestClose={this.onOptionSelected}>
					Are you sure you want to delete this?
				</Dialog>

				<Dialog
					modal={false}
					open={this.state.datePickerOpen}
					onRequestClose={this.onOptionSelected}>
					Select due date
					<DatePicker hintText="Date Picker" onChange={this.onDateSelected} />
				</Dialog>
			</div>
		)
	}
}

export default Edit;