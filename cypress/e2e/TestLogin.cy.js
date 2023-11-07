
describe('Login Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl') + '/login');
    });

    it('should log in successfully', () => {
        const email = Cypress.env('email');
        const password = Cypress.env('password');

        cy.get('[data-test = "test_login_email"]').type(email);
        cy.get('[data-test = "test_login_password"]').type(password);
        cy.get('form').submit();

        cy.url().should('include', '/welcome');
    });

    it('should navigate to signup page', () => {
        cy.contains('Sign Up').click();
        cy.url().should('include', '/signup');
    });

});
