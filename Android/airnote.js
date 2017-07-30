import React, { Component } from "react";
import { Navigator, UIManager, AppState, BackAndroid } from "react-native";

import { ThemeProvider } from "react-native-material-component";
import { PRICOLOR, ACCENTCOLOR } from "./src/helpers/constant.js";
import MainPage from "./src/ui/main.js";
import SplashPage from "./src/ui/splash.js";
import EditPage from "./src/ui/edit.js";
import SettingPage from "./src/ui/setting.js";

const uiTheme = {
	palette: {
		primaryColor: PRICOLOR,
		accentColor: ACCENTCOLOR
	},
	toolbar: {
		container: {
			height: 55
		}
	}
};

class Airnote extends Component {
	constructor(params) {
		super(params);
		this.state = {
			appState: 'initial',
		}
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	componentDidMount(){
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount(){
		AppState.removeEventListener('change', this.handleAppStateChange);
	}
	
	handleAppStateChange(nextAppState){
		if(nextAppState === 'background'){
			this.setState({appState:nextAppState});
			BackAndroid.exitApp();
		}
	}
	
	renderScene(route, navigator) {
		let routeId = route.id;
		if (routeId == 1) {
			return <SplashPage navigator={navigator} route={route} appState={this.state.appState}/>;
		} else if (routeId == 2) {
			return <MainPage navigator={navigator} route={route} appState={this.state.appState}/>;
		} else if (routeId == 3) {
			return <EditPage navigator={navigator} route={route} appState={this.state.appState}/>;
		} else if (routeId == 4) {
			return <SettingPage navigator={navigator} route={route} appState={this.state.appState}/>;
		}
	}

	render() {
		return (
			<ThemeProvider uiTheme={uiTheme}>
				<Navigator
					initialRoute={{ id: "1", name: "Splash" }}
					renderScene={this.renderScene.bind(this)}
					configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid }
				/>
			</ThemeProvider>
		);
	}
}

export default Airnote;
