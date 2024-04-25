import {mount} from "cypress/react";
import React from 'react';
import FormNewBoard from './FormNewBoard';

describe('<FormNewBoard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		mount(<FormNewBoard/>);
	});
});
