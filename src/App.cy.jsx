import {mount} from "cypress/react";
import React from 'react';
import App from './App';

describe('<App />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		mount(<App/>);
	});
});
