
import React, { Component } from 'react';
import Fluxify from 'fluxify';
import { Link } from 'react-router-dom';

import { getAll } from '../../helper/Database';
import { getCreatedOn, getDateTime } from '../../helper/Collection'
import { Type } from '../../enum/Type';
import { PRICOLOR } from '../../helper/Constant'

import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
								<Card>
									<CardTitle title={item.title} subtitle={`#${item.noteTag}`} />
									<CardText style={{ height: 80 }}>
										<p style={{ overflow: 'hidden', fontSize:19 }}>{`${item.text.substring(0, 50)}...`}</p>
									</CardText>
									<CardActions>
										<Link to={{ pathname: '/edit', state: { item: item } }}>
											<FlatButton backgroundColor="#f1f1f1" label="VIEW" />
										</Link>
									</CardActions>
								</Card>
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
