import React, { Component, PropTypes } from 'react';
import { ListView, View, Text, Linking, Alert, TouchableOpacity } from 'react-native';

import { Toolbar, FloatingActionButton, Card, Toast, SwipeListView } from 'react-native-material-component'
import { getData } from '../helpers/appstore.js';
import { SIDEMARGIN, UPDOWNMARGIN, FONTSIZE, FONTSTYLE, PRICOLOR } from '../helpers/constant.js';
import { Page } from '../enums/page.js';
import { Type } from '../enums/type';
import Container from './container.js';
import SettingPage from './setting.js';
import DatabaseHelper from '../helpers/database.js';
import Communications from 'react-native-communications';
import styles from '../helpers/styles.js';
import Store from '../helpers/store';
import Fluxify from 'fluxify';


import { propTypes, mainPageMenuItems } from '../helpers/constant.js';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

class MainPage extends Component {
	constructor(params) {
		super(params);
		this.state = {
			notesDataSource: ds.cloneWithRows([]),
			tasksDataSource: ds.cloneWithRows([]),
			notes: [],
			tasks: [],
			title: 'Note',
			currentIcon: 'view-quilt',
		}

		this.setDataToDatabase = this.setDataToDatabase.bind(this);
		this.createViewAndEditNote = this.createViewAndEditNote.bind(this);
		this.onRightElementPress = this.onRightElementPress.bind(this);
		this.deleteRow = this.deleteRow.bind(this);
		this.callback = this.callback.bind(this);

		this.renderListItem = this.renderListItem.bind(this);
		this.renderEmptyMessage = this.renderEmptyMessage.bind(this);
	}


	componentDidMount() {
		this.setState({ title: Store.title });
		this.setDataToDatabase();

	}

	setDataToDatabase() {
		DatabaseHelper.getAllItems((result) => {
			const notes = result.filter(x => x.type == Type.NOTE).slice();
			this.setState({
				notesDataSource: ds.cloneWithRows(notes.slice()),
				notes: notes.slice()
			});
		})
	}

	callback() {
		this.setDataToDatabase();
	}

	createViewAndEditNote(item) {
		getData(FONTSIZE)
			.then((size) => {
				const page = Page.EDIT_PAGE;
				const data = {
					item: item,
					callback: this.callback,
					textSize: size ? size : 16,
				};
				this.props.navigator.push({ id: page.id, name: page.name, data: data })
			});
	}

	onRightElementPress(action) {
		const index = action.index;
		if (action.action != 'menu') {
			const targetTitle = this.state.title == Type.NOTE ? Type.TASK : Type.NOTE;
			this.setState({ title: targetTitle });
			//Fluxify.doAction('updateTitle', targetTitle);
		} else if (action.action == 'menu') {
			if (mainPageMenuItems[index] === 'Settings') {
				getData(FONTSIZE)
					.then((size) => {
						const page = Page.SETTING_PAGE;
						const data = {
							textSize: size ? size : 16,
						};
						this.props.navigator.push({ id: page.id, name: page.name, data: data })
					});
			} else if (mainPageMenuItems[index] === 'Share this app') {
				Communications.email(null, null, null, null, 'http://play.google.com/store/apps/details?id=com.air.airnote');
			} else if (mainPageMenuItems[index] === 'Rate this app') {
				Linking.openURL('market://details?id=com.air.airnote');
			}
		}

	}

	deleteRow(secId, rowId, _rowMap) {
		const { notes, tasks, title } = this.state;
		const items = title == Type.TASK ? tasks.slice() : notes.slice();
		const rowMap = Object.assign({}, _rowMap);
		Alert.alert(null, 'Are you sure you want to delete this note?',
			[{
				text: 'OK',
				onPress: () => {
					DatabaseHelper.removeItemById(items[rowId]._id, result => {
						rowMap[`${secId}${rowId}`].closeRow();
						items.splice(rowId, 1);
						if (title == Type.TASK) {
							this.setDataToDatabase()
							//Fluxify.doAction("updateTasks", items)
						} else {
							this.setDataToDatabase()
							//Fluxify.doAction("updateNotes", items)
						}
						Toast.show('Note deleted.');
					});
				}
			},
			{
				text: 'CANCEL',
				onPress: () => {

				}
			}]);
	}

	renderEmptyMessage() {
		const { title, notes, tasks } = this.state;
		if (title == Type.NOTE && notes.length < 1) {
			return (
				<Text style={[styles.main_page_description_text, { fontSize: 16, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }]}>
					It's empty in here, try creating a new note.
				</Text>
			);
		} else if (title == Type.TASK && tasks.length < 1) {
			return (
				<Text style={[styles.main_page_description_text, { fontSize: 15, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }]}>
					It's empty in here, try creating a new task.
				</Text>
			);
		} else {
			return null;
		}
	}

	renderListItem(item) {
		const tag = item.type == Type.NOTE ? `#${item.noteTag}` : `#${item.taskType}`;
		return (
			<Card style={{ minHeight: 50, paddingTop: 10, paddingBottom: 10 }} fullWidth="1" onPress={() => this.createViewAndEditNote(item)}>
				<View style={styles.main_page_list_item_container}>
					<Text style={styles.main_page_header_text}>
						{item.title}
					</Text>
					<Text style={[styles.main_page_description_text, { fontSize: 12, marginBottom: 8 }]}>
						{tag}
					</Text>
					<Text style={[styles.main_page_description_text]}>
						{item.text}
					</Text>
					<Text style={[styles.main_page_description_text, { color: PRICOLOR }]}>
						{item.endsIn}
					</Text>
				</View>
			</Card>
		);
	}

	render() {
		const { title, currentIcon, notesDataSource } = this.state;
		return (
			<Container>
				<Toolbar
					centerElement={"Notes"}
					rightElement={{ menu: { labels: mainPageMenuItems } }}
					onRightElementPress={(action) => this.onRightElementPress(action)} />

				{this.renderEmptyMessage()}

				<SwipeListView
					dataSource={notesDataSource}
					keyboardShouldPersistTaps='always'
					keyboardDismissMode='interactive'
					enableEmptySections={true}
					renderRow={(item) => this.renderListItem(item)}
					renderHiddenRow={(data, secId, rowId, rowMap) => (
						<View style={styles.row_back_swipe_list_view}>
							<TouchableOpacity style={[styles.back_right_holder_swipe_list_view, styles.back_right_button_swipe_list_view]} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
								<Text style={[styles.text_with_margin_bottom_and_font_size_14, { margin: 0, fontSize: 16 }]}>Delete</Text>
							</TouchableOpacity>
						</View>
					)}
					leftOpenValue={0}
					rightOpenValue={-120} />

				<FloatingActionButton icon='add' onPress={() => this.createViewAndEditNote(null)} />
			</Container>
		)
	}

}

MainPage.propTypes = propTypes;
export default MainPage;
