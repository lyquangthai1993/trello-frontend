import React from 'react';
import FormNewBoard from './FormNewBoard';

describe('<FormNewBoard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<FormNewBoard/>);
	});
});
