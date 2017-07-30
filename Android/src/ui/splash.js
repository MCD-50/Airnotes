import React, { Component } from 'react';

import { View, Image, StatusBar } from 'react-native';
import { Page } from '../enums/page.js';
import styles from '../helpers/styles.js';
import { propTypes } from '../helpers/constant.js';
const background = require('../res/splash.png');


class SplashPage extends Component {
	componentDidMount() {
		const page = Page.MAIN_PAGE;
		setTimeout(() => this.props.navigator.replace({ id: page.id, name: page.name }), 1500);
	}

	render() {
		return (
			<View style={styles.container_with_flex_1}>
				<StatusBar backgroundColor='black' barStyle='light-content' />
				<View style={styles.splash_screen_view}>
					<Image source={background} style={styles.splash_screen_image} resizeMode="contain" />
				</View>
			</View>
		);
	}
}

SplashPage.propTypes = propTypes;
export default SplashPage;