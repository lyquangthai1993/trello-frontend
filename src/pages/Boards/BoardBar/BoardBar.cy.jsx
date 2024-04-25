// import {mount} from "cypress/react";
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import theme from "~/theme";

import mockdata from '../../../../cypress/fixtures/mockData.json';
import BoardBar from './BoardBar';

describe('Board bar ------', () => {
	it('renders macbook-16', () => {
		// see: https://on.cypress.io/mounting-react
		cy.log('board', mockdata);
		cy.viewport(1024, 768);
		cy.mount(
				<CssVarsProvider theme={theme}>
					<BoardBar board={mockdata}/>
					<BoardContent board={mockdata}/>
				</CssVarsProvider>
		);
	});
});
