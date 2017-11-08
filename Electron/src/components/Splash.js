import React, { Component } from 'react';
import splashImage from '../assets/airnews-transparent.png';

class Splash extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.history.replace('/home');
		}, 2500);
<<<<<<< HEAD
=======


>>>>>>> 749893f41caef39b1353cf590659a86998894a25
	}

	render() {
		return (
			<div className='splash-container' style={{ backgroundColor: 'black', display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
				<img height='200' width='200' src={splashImage}></img>
			</div>);
	}
}

export default Splash;