import React from 'react';
import './InitialComponent.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const InitialComponent = ({ hello }: { hello: string }) => {

	return(
		<div className="App">
			<header className="App-header">
				<img src="assets/img/logo.svg" className="App-logo" alt="logo" />
				<p>This is the text from the store of redux: <strong>{hello}</strong></p>
				<p>
					Edit <code>src/frontend/InitialComponent.jsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<Link className="App-link" to="/other-component">Other Component</Link>
			</header>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		hello: state.testReducer.hello
	};
};

export default connect(mapStateToProps)(InitialComponent);
