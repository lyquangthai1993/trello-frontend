import React from 'react';
import Boards from './Boards';

describe('<Boards />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<Boards/>);
	});
});
