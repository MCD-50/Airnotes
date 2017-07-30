import React, { Component } from 'react';

const Empty = ({ message }) => {
	return (
		<div style={{ marginLeft: 16, marginRight: 16 }}>
			<h1 style={{ marginLeft: 8, marginRight: 8, fontSize: 17, fontFamily: 'Roboto, sans-serif', fontWeight: 300, color: 'black' }}>
				{message}
			</h1>
		</div>
	)
}

export default Empty;