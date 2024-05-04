import React from 'react';
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<LoadingSpinner/>);
		
	});
	
	it('check DOM elements', () => {
		cy.mount(<LoadingSpinner/>);
		cy.get('.MuiCircularProgress-circle').should('exist');
	});
});
