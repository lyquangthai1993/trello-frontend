import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import React from 'react';
import theme from "~/theme";
import FormNewBoard from './FormNewBoard';

describe('<FormNewBoard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.viewport(1024, 768);
		
		cy.mount(
				<CssVarsProvider theme={theme}>
					<FormNewBoard createBoard={() => {
						console.log('createBoard');
					}}/>
				</CssVarsProvider>
		);
		cy.get('form').should('exist');
		cy.get('input[name="title"]').should('have.length', 1).type('New Board');
		cy.get('textarea[name="description"]').should('have.length', 1).type('Description');
		
		cy.get('button[type="submit"]').should('exist').click();
	});
});
