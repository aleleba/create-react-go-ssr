import React from 'react';
import InitialComponent from '../frontend/components/InitialComponent';
import OtherComponent from '../frontend/components/OtherComponent';

const OTHER_COMPONENT = {
	path: '/other-component',
	element: <OtherComponent />
};

const INITIAL_COMPONENT = {
	path: '/',
	element: <InitialComponent />,
};

export default [ INITIAL_COMPONENT, OTHER_COMPONENT ];
