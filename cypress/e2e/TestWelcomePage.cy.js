// cypress/integration/welcomePage.spec.js

describe('Welcome Page', () => {
    beforeEach(() => {

        cy.visit(Cypress.env('baseUrl') + '/welcome');
    });

    it('should display the Welcome Page', () => {
        cy.contains('Welcome Page').should('be.visible');
    });

    it('should toggle dark/light mode', () => {

        cy.get('.toggle-button').click();
        //TODO: Add assert to check if the theme has changed

        cy.get('.toggle-button').click();
        //TODO: Add assert to check if the theme has changed
    });


    it('should edit a user', () => {

    });

    it('should delete a user', () => {

    });

    it('should create a new user', () => {

    });


    it('should log out', () => {
        cy.contains('Logout').click();
        // TODO: Assert that the user is redirected to the login page
        // TODO: Add assert to check if the user is on the login page
    });
});
