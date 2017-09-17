
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

import { getTextColor } from '../../helper/Collection'

class Note extends Component {
	constructor(props) {
		super(props);
		this.renderNotes = this.renderNotes.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.notes === nextProps.notes) {
			return false;
		} else {
			return true;
		}
	}

	renderNotes(items) {
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
											<div style={{ height: 110, background: getTextColor(item.text) }}>
											</div>
										</CardMedia>
										<CardText style={{ height: 80, overflow: 'hidden', marginRight: 10 }}>
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
				{this.renderNotes(this.props.notes)}
			</div>
		)
	}
}


export default Note
