import {mount} from 'cypress/react';
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		mount(<LoadingSpinner/>);
	});
});
