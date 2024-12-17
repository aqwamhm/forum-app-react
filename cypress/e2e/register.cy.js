/**
 * test scenario for Register spec
 *
 * - Register spec
 *  - should display register page correctly
 *  - should display alert when name is empty
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display alert when email is invalid
 *  - should display alert when password is too short
 *  - should display homepage when registration is successful
 *
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('input[placeholder="Name"]').type('Test User');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('test@test.com');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email is invalid', () => {
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('invalid-email');
    cy.get('input[placeholder="Password"]').type('password123');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is too short', () => {
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('test@test.com');
    cy.get('input[placeholder="Password"]').type('short');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('password must be at least 6 characters long');
    });
  });

  it('should display homepage when registration is successful', () => {
    const randomString = () => Math.random().toString(36).substring(2, 10);
    const name = `TestUser_${randomString()}`;
    const email = `test_${randomString()}@test.com`;
    const password = `password_${randomString()}`;

    cy.get('input[placeholder="Name"]').type(name);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.get('h1')
      .contains(/^Login$/)
      .should('be.visible');
  });
});
