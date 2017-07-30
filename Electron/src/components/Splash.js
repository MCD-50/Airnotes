import React, { Component } from 'react';

class Splash extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.history.replace('/home');
		}, 2500);

		
	}

	render() {
		return (
			<div className='splash-container' style={{ background: '#fff' }}>
				<h1>Loading</h1>
			</div>);
	}
}

export default Splash;