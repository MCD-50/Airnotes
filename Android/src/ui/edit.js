import React, { Component, PropTypes, DeviceEventEmitter } from "react";
import { BackAndroid, View, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";

import { Toolbar, ActionButton, Avatar } from "react-native-material-component";
import { UPDOWNMARGIN, SIDEMARGIN } from "../helpers/constant.js";
import { Type } from '../enums/type';
import { getCreatedOn } from "../helpers/collection.js";
import { PRICOLOR, TEXTGRAYSECCOLOR } from "../helpers/constant.js";
import { RichTextEditor, RichTextToolbar, actions } from "react-native-zss-rich-text-editor";

import Container from "./container.js";
import DatabaseHelper from "../helpers/database.js";
import KeyboardSpacer from "react-native-keyboard-spacer";
import styles from '../helpers/styles.js';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Store from '../helpers/store';
import Fluxify from 'fluxify';


import { propTypes, _actions, NOTE_TYPE, TASK_TYPE } from '../helpers/constant.js';
import { getDateTime } from '../helpers/collection'

const example = `<p class=\"md-block-unstyled\">import React, { Component, PropTypes } from</p><p class=\"md-block-unstyled\">mncdvndfv</p><p class=\"md-block-unstyled\"><strong class=\"md-inline-bold\">dmndsvjkdfnvdfjkbnfdjb</strong></p><ul class=\"md-block-unordered-list-item\"><li><strong class=\"md-inline-bold\">dnjsdvndfvfdbfd</strong></li><li><strong class=\"md-inline-bold\"><span class=\"md-inline-highlight\">bidvb</span></strong></li></ul>","text":"import React, { Component, PropTypes } from\nmncdvndfv\ndmndsvjkdfnvdfjkbnfdjb\ndnjsdvndfvfdbfd\nbidvb`

const _customCSS =
	`#zss_editor_content {
				padding-left: 0px;
				padding-right: 0px;
			}

			#zss_editor_title {
				padding-left: 0px;
				padding-right: 0px;
			}
			
			[placeholder]:empty:before {
				content: attr(placeholder);
				color: #757575;
			}

			[placeholder]:empty:focus:before {
				content: attr(placeholder);
				color: #757575;
			}
			#separatorContainer {
				-webkit-user-select: none;
				padding-left: 0px;
				padding-right: 0px;
			}`;


class EditPage extends Component {
	constructor(params) {
		super(params);

		_customCSS +=
			`body {
				padding-top: 0px;
				padding-bottom: 0px;
				padding-left:0px;
				padding-right:0px;
				font-size: ${this.props.route.data.textSize}px;
				overflow-y: scroll;
				-webkit-overflow-scrolling: touch;
				height: 100%;
			}`;


		this.state = {
			item: null,
			itemType: Store.title,
			html: '',
			text: '',
			title: this.getDate(),

			taskType: TASK_TYPE[0],
			noteTag: NOTE_TYPE[0],
			endsIn: 'Deadline not specified.',

			isDateTimePickerVisible: false,
			showKeyboardSpacer: this.props.appState === 'initial',

			icons: {
				bold: "all-inclusive",
				unorderedList: "crop-din",
				INST_LINK: "insert-link",
				ends: 'event',
			},
			keyboardSpace: 0,
		};


		this.addBackEvent = this.addBackEvent.bind(this);
		this.removeBackEvent = this.removeBackEvent.bind(this);

		this.handleDatePicked = this.handleDatePicked.bind(this);
		this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
		this.showDateTimePicker = this.showDateTimePicker.bind(this);
		this.onRightElementPress = this.onRightElementPress.bind(this);

		this.updateItem = this.updateItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.getHTML = this.getHTML.bind(this);
		this.renderAction = this.renderAction.bind(this);
	}

	addBackEvent() {
		BackAndroid.addEventListener("hardwareBackPress", () => {
			if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
				this.updateItem();
				return true;
			}
			return false;
		});
	}

	removeBackEvent() {
		BackAndroid.removeEventListener("hardwareBackPress", () => {
			if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
				this.updateItem();
				return true;
			}
			return false;
		});
	}

	componentDidMount() {
		const item = this.props.route.data.item;
		if (item) {
			let _icons = this.state.icons;
			_icons["delete"] = "delete";
			this.setState({
				item: item,
				itemType: item.type,
				html: item.html,
				text: item.text,
				title: item.title,
				noteTag: item.noteTag,
				taskType: item.taskType,
				endsIn: item.endsIn,
				icons: _icons
			});
		};
		this.addBackEvent();
	}

	componentWillUnmount() {
		this.removeBackEvent();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props != nextProps) {
			setTimeout(() => this.setState({ showKeyboardSpacer: nextProps.appState === 'initial' }), 10);
		}
		return this.state != nextState;
	}

	showDateTimePicker() {
		this.setState({ isDateTimePickerVisible: true });
	}

	hideDateTimePicker() {
		this.setState({ isDateTimePickerVisible: false });
	}

	getCustomCss(size) {
		return
	}

	handleDatePicked = (date) => {
		date = date.toString().split(' ');
		if (date.length > 0) {
			const selected_date = `${date[1]}, ${date[2]} ${date[3]}`;
			this.setState({ endsIn: 'End by ' + selected_date });
		}
		this.hideDateTimePicker();
	};

	getDate() {
		let today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		return getCreatedOn(yyyy + "-" + mm + "-" + dd);
	}

	onRightElementPress(action) {
		const index = action.index;
		if (this.state.itemType == Type.TASK) {
			this.setState({ taskType: TASK_TYPE[index] });
		} else {
			this.setState({ noteTag: NOTE_TYPE[index] });
		}
	}


	updateItem() {
		const { item, title, itemType, noteTag, taskType, endsIn } = this.state;
		const dateTime = getDateTime();
		this.getHTML()
			.then(html => {
				const text = html.replace(/(<([^>]+)>)/g, "_%_").split("_%_").join(' ').trim();
				if (item && html.trim() != '') {
					DatabaseHelper.updateItem(item._id, {
						title: this.getDate(),
						html: html,
						text: text.substring(0, 50) + '...',
						modifiedOn: dateTime,
						type: itemType,
						noteTag: noteTag,
						taskType: taskType,
						endsIn: endsIn,
					}, result => {
						this.props.route.data.callback();
						this.props.navigator.pop();
					});
				} else if (item && html.trim() == '') {
					DatabaseHelper.removeItemById(item._id, result => {
						this.props.route.data.callback();
						this.props.navigator.pop();
					});
				} else if (item == null && html.trim().length > 0) {
					DatabaseHelper.addNewItem({
						title: this.getDate(),
						html: html,
						text: text.substring(0, 50) + '...',
						modifiedOn: dateTime,
						userId: 1,
						type: itemType,
						noteTag: noteTag,
						taskType: taskType,
						endsIn: endsIn,
					}, result => {
						this.props.route.data.callback();
						this.props.navigator.pop();
					});
				} else {
					this.props.navigator.pop();
				}
			});
	}

	deleteItem(item) {
		Alert.alert(null, 'Are you sure you want to delete this item?',
			[{
				text: 'OK',
				onPress: () => {
					DatabaseHelper.removeItemById(item._id, result => {
						this.removeBackEvent();
						this.props.route.data.callback();
						this.props.navigator.pop();
					});
				}
			},
			{
				text: 'CANCEL',
				onPress: () => {

				}
			}]);

	}


	async getHTML() {
		return await this.richtext.getContentHtml();
	}

	renderAction(action, selected) {
		const icon = this.state.icons[action];
		const _color = selected ? PRICOLOR : TEXTGRAYSECCOLOR;
		const _size = selected ? (action == actions.insertBulletsList ? 24 : 28) : action == actions.insertBulletsList ? 20
			: action == actions.insertLink ? 26 : action == 'ends' ? 21 : 22;
		return (
			<TouchableOpacity style={styles.edit_page_touchable_opacity}
				onPress={() => {
					const editor = this.richtext;
					if (action === actions.setBold || action === actions.insertBulletsList) {
						editor._sendAction(action);
					} else if (action === "delete" && this.state.item) {
						this.deleteItem(this.state.item);
					} else if (action === "ends") {
						this.showDateTimePicker();
					}
					//else if (action === actions.insertLink) {
					// 	editor.prepareInsert();
					// 	editor.getSelectedText().then(selectedText => {
					// 		editor.showLinkDialog(selectedText);
					// 	});
					// }
				}}>
				<Avatar icon={icon} iconColor={_color} iconSize={_size} bgcolor="transparent" />
			</TouchableOpacity>
		);
	}

	render() {
		const _x = this.state.itemType == Type.NOTE ? NOTE_TYPE : TASK_TYPE;
		console.log()
		return (
			<Container>
				<Toolbar
					leftElement="arrow-back"
					onLeftElementPress={() => this.updateItem()}
					rightElement={{ menu: { labels: _x } }}
					centerElement={this.state.title}
					onRightElementPress={(action) => this.onRightElementPress(action)} />

				<RichTextEditor
					style={styles.edit_page_rich_text_editor}
					contentPlaceholder="Start typing from here..."
					ref={r => this.richtext = r}
					hideKeyboardAccessoryView={false}
					keyboardDisplayRequiresUserAction={true}
					initialContentHTML={this.state.html}
					hiddenTitle={true}
					customCSS={_customCSS} />

				<RichTextToolbar
					getEditor={() => this.richtext}
					style={styles.edit_page_rich_text_toolbar}
					actions={_actions}
					renderAction={(action, selected) => this.renderAction(action, selected)} />

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					mode="date"
					titleIOS="Select deadline" />

				{<KeyboardSpacer />}
			</Container>
		);
	}
}

EditPage.propTypes = propTypes;

export default EditPage;
