import React, { Component } from 'react';
import Fluxify from 'fluxify';
import { Link } from 'react-router-dom';

import { getAll } from '../../helper/Database';
import { getCreatedOn, getDateTime } from '../../helper/Collection'
import { Type } from '../../enum/Type';
import { PRICOLOR } from '../../helper/Constant'


import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

class Task extends Component {

	constructor(props) {
		super(props);
		this.renderTasks = this.renderTasks.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.tasks === nextProps.tasks) {
			return false;
		} else {
			return true;
		}
	}

	renderTasks(items) {
		const _items = items.slice();
		return (
			<div style={{
				display: 'flex',
				flexWrap: 'wrap'
			}}>
				{
					_items.map((item, index) => {
						return (
							<div key={index} style={{ width: '24%', margin: '0.5%', minWidth: 150 }}>
								<Link to={{ pathname: '/edit', state: { item: item } }} style={{ textDecoration: 'none' }}>
									<Card>
										<CardMedia overlay={<CardTitle subtitle={item.title} />}>
											<img src="https://verilymag.com/.image/t_share/MTQ1MjI2NDYwNjY2Mjc1MjI0/emma-watson-ethicalfashion-style.png" alt="Emma watson" />
										</CardMedia>
										<CardText style={{ height: 80 }}>
											{`${item.text.substring(0, 80)}...`}
										</CardText>
										<Divider />

										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<IconButton tooltip={item.taskType}> <FontIcon className="material-icons">control_point_duplicate</FontIcon></IconButton>
											<CardText>
												{item.endsIn}
											</CardText>
										</div>
										<CardText>
											{item.taskType}
										</CardText>
									</Card>
								</Link>
							</div>);
					})
				}
			</div>
		);
	}


	render() {
		return (
			<div>
				{this.renderTasks(this.props.tasks)}
			</div>
		)
	}
}


export default Task
