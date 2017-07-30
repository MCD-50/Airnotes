import React, { Component } from 'react';
import Store from '../store/Store';


const childContextTypes = {
	notes: React.PropTypes.array,
	tasks: React.PropTypes.array,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			tasks: []
		}
	}

	getChildContext() {
		const { notes, tasks } = this.state;
		return {
			notes: notes.slice(),
			tasks: tasks.slice()
		};
	}

	componentDidMount() {
		Store.on('change:notes', (notes) => {
			this.setState({ notes: notes.slice() });
		});

		Store.on('change:tasks', (tasks) => {
			this.setState({ tasks: tasks.slice() });
		});
	}

	render() {
		const x = Object.assign({}, this.state);
		//{React.Children.map(this.props.children, child => React.cloneElement(child, { y: x }))}
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

App.childContextTypes = childContextTypes;
export default App;