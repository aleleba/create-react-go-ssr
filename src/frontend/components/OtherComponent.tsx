import React from 'react';
// import logo from '../logo.svg';
import './InitialComponent.scss';
import { Link } from 'react-router-dom';

const OtherComponent = () => (
	<div className="App">
		<header className="App-header">
			<img src="assets/img/logo.svg" className="App-logo" alt="logo" />
			<p>
            Edit <code>src/frontend/OtherComponent.jsx</code> and save to reload.
			</p>
			<Link className="App-link" to="/">Initial Component</Link>
		</header>
	</div>
);

export default OtherComponent;
