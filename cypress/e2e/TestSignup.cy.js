// cypress/integration/signup.spec.js

describe('Signup Page', () => {
    beforeEach(() => {

        cy.visit(Cypress.env('baseUrl') + '/signup');
    });

    it('should sign up successfully', () => {

        const email = Cypress.env('email');
        const password = Cypress.env('password');
        const name = Cypress.env('name');

        cy.get('[data-test=test_signup_name]').type(name);
        cy.get('[data-test=test_signup_email]').type(email);
        cy.get('[data-test=test_signup_password]').type(password);
        cy.get('[data-test=test_signup_button_submit]').click();


        cy.url().should('include', '/welcome');
    });

    it('should navigate to login page', () => {

        cy.contains('Login').click();

        cy.url().should('include', '/login');
    });
});
