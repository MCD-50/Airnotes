import React, { Component, PropTypes, } from 'react';
import { View, StyleSheet, ScrollView, Text, BackAndroid, Switch, Linking, Picker } from 'react-native';

import { Toolbar, Card } from 'react-native-material-component'
import { SIDEMARGIN, UPDOWNMARGIN, FONTSIZE, FONTSTYLE } from '../helpers/constant.js';
import { setData } from '../helpers/appstore.js';
import styles from '../helpers/styles.js';
import Container from './container.js';
import Communications from 'react-native-communications';
import { propTypes } from '../helpers/constant.js';

class SettingPage extends Component {

	constructor(params) {
		super(params);
		
		const data = this.props.route.data;
		this.state = {
			textSize: data.textSize,
		}

		this.addBackEvent = this.addBackEvent.bind(this);
		this.removeBackEvent = this.removeBackEvent.bind(this);
		this.onEmail = this.onEmail.bind(this);
		this.onTextSizeChanged = this.onTextSizeChanged.bind(this);
		this.onTextStyleChanged = this.onTextStyleChanged.bind(this);
	}

	addBackEvent() {
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
				this.props.navigator.pop();
				return true;
			}
			return false;
		});
	}

	removeBackEvent() {
		BackAndroid.removeEventListener('hardwareBackPress', () => {
			if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
				this.props.navigator.pop();
				return true;
			}
			return false;
		});
	}

	componentWillMount() {
		this.addBackEvent();
	}

	componentWillUnmount() {
		this.removeBackEvent();
	}

	onTextStyleChanged(_style) {
		setData(FONTSTYLE, _style);
		this.setState({ textStyle: _style })
	}

	onTextSizeChanged(size) {
		setData(FONTSIZE, size);
		this.setState({ textSize: size })
	}
	
	onEmail() {
		let email = 'ayush.as.shukla@gmail.com';
		Communications.email(email, null, null, null, null);
	}

	render() {
		return (
			<Container>
				<Toolbar
					leftElement="arrow-back"
					onLeftElementPress={() => this.props.navigator.pop()}
					centerElement={this.props.route.name} />

				<ScrollView style={styles.container_with_flex_1} keyboardDismissMode='interactive'>
					<Card style={{minHeight: 50, justifyContent: 'center'}} fullWidth="1">
						<View style={styles.setting_page_inside_card_view}>
							<Text style={styles.setting_page_text}>Accept Privacy Policy </Text>
							<Switch style={styles.setting_page_switch} value={true} disabled={true} />
						</View>
					</Card>

					<Card style={{minHeight: 50, justifyContent: 'center'}} fullWidth="1">
						<View style={[styles.setting_page_inside_card_view, { flexDirection: 'column' }]}>
							<Text style={[styles.setting_page_text, { fontSize: 15 }]}>Set text size for editor</Text>
							<View style={{ margin: UPDOWNMARGIN, height: 1, backgroundColor: '#131313' }} />
							<Picker style={{ flex: 1 }}
								selectedValue={this.state.textSize}
								onValueChange={(size) => this.onTextSizeChanged(size)}>
								<Picker.Item label="16" value="16" />
								<Picker.Item label="17" value="17" />
								<Picker.Item label="18" value="18" />
								<Picker.Item label="19" value="19" />
								<Picker.Item label="20" value="20" />
							</Picker>
						</View>
					</Card>

					<Card style={{minHeight: 50, justifyContent: 'center'}} fullWidth="1">
						<View style={[styles.setting_page_inside_card_view, { flexDirection: 'column' }]}>
							<Text style={[styles.setting_page_text, { fontSize: 15 }]}>Airnote is simple note making app. Which is built using javaScript and react native framework.</Text>
							<View style={{ margin: UPDOWNMARGIN, height: 1, backgroundColor: '#131313' }} />
							<Text onPress={() => this.onEmail()} style={[styles.setting_page_text, { fontSize: 15, color: '#dd2c00', paddingTop: 5, paddingLeft: UPDOWNMARGIN, paddingRight: UPDOWNMARGIN }]}>Contact developer</Text>
							<Text onPress={() => Linking.openURL('https://github.com/MCD-50/Airnote-Phone')} style={[styles.setting_page_text, { fontSize: 15, color: '#dd2c00', paddingTop: 5, paddingLeft: UPDOWNMARGIN, paddingRight: UPDOWNMARGIN }]}>Source code at github</Text>
						</View>
					</Card>

					<Card style={{minHeight: 50, justifyContent: 'center'}} fullWidth="1">
						<View style={[styles.setting_page_inside_card_view, { flexDirection: 'column' }]}>
							<Text style={[styles.setting_page_text, { fontSize: 15 }]}>Support development of airnote for android. Paypal airnote</Text>
							<View style={{ margin: UPDOWNMARGIN, height: 1, backgroundColor: '#131313' }} />
							<Text onPress={() => Linking.openURL('https://www.paypal.com/AyushAS')} style={[styles.setting_page_text, { fontSize: 15, color: '#dd2c00', padding: 1, paddingLeft: UPDOWNMARGIN, paddingRight: UPDOWNMARGIN }]}>Buy coffee for developer</Text>
						</View>
					</Card>

					<Card style={{minHeight: 50, justifyContent: 'center'}} fullWidth="1">
						<View style={[styles.setting_page_inside_card_view, { flexDirection: 'column' }]}>
							<Text style={[styles.setting_page_text, { fontSize: 15 }]}>Powered by react-native-material-component</Text>
							<View style={{ margin: UPDOWNMARGIN, height: 1, backgroundColor: '#131313' }} />
							<Text onPress={() => Linking.openURL('https://github.com/MCD-50/react-native-material-component')} style={[styles.setting_page_text, { fontSize: 15, color: '#dd2c00', padding: 1, paddingLeft: UPDOWNMARGIN, paddingRight: UPDOWNMARGIN }]}>Get react-native-material-component for faster development.</Text>
						</View>
					</Card>

					<View style={[styles.setting_page_inside_card_view, { justifyContent: 'flex-end' }]}>
						<Text style={[styles.setting_page_text, { color: '#b2b2b2', padding: 0, paddingLeft: UPDOWNMARGIN, paddingRight: UPDOWNMARGIN, fontSize: 13, alignItems: 'flex-end' }]}>Airnote 1.1</Text>
					</View>

				</ScrollView>
			</Container>
		);
	}
}

SettingPage.propTypes = propTypes;
export default SettingPage;