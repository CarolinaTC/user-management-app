import '../support/commands';
// TODO: toggle dark / light mode
let loggedIn = false;
describe('Welcome Page', () => {
    before(() => {
        // Log in only once at the beginning of the test 
        //cy.login();
        //cy.visit(Cypress.env('baseUrl') + '/welcome');
    });
    beforeEach(() => {
        cy.login()
        cy.visit(Cypress.env('baseUrl') + '/welcome');
        /*   if (!loggedIn) {
              cy.login();
              loggedIn = true;
          }
          cy.visit(Cypress.env('baseUrl') + '/welcome'); */
  
    });

    it('should display the Welcome Page', () => {
        cy.contains('Welcome Page').should('be.visible');
    });

    it('should toggle dark/light mode', () => {


    });


    it('should edit a user', () => {
        cy.get('[data-test="test_button_edit_user_0"]').click();
        cy.get('[data-test="test_header_edit_user"]').should('be.visible');
        cy.get('input#name').clear().type('John Doe');
        cy.get('[data-test="test_modal_save_edit_user"]').click();
        cy.get('[data-test="test_header_edit_user"]').should('not.exist');

    });

    it('should delete a user', () => {
        cy.get('[data-test="test_button_delete_user_1"]').click()
        cy.get('[data-test="test_header_delete_user"]').should('be.visible');
        cy.get('[data-test="test_modal_delete_user_confirm"]').click();
        cy.get('[data-test="test_header_delete_user"]').should('not.exist');
    });

    it('should create a new user', () => {
        cy.get('[data-test="test_button_create_user"]').click();
        cy.get('[data-test="test_header_create_user"]').should('be.visible');
        cy.get('input#name').type('John Doe');
        cy.get('input#job').type('dev');
        cy.get('[data-test="test_modal_create_user_save"]').click();
        cy.get('[data-test="test_header_create_user"]').should('not.exist');

    });
    it('should load additional pages when clicking on the pagination buttons', () => {
        cy.get('[data-test="test_table_id_0"]').contains("1")
        // click on next page
        cy.get(':nth-child(3) > .MuiButtonBase-root').click()
        cy.get('[data-test="test_table_id_0"]').contains("7")
    });

    it('should log out', () => {
        cy.contains('Logout').click();
        cy.url().should('include', '/login');
        cy.contains('Login').should('be.visible');
    });
});
