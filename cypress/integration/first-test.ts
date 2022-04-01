describe('login', () => {
  const emailInput = 'input[name=email]';
  const passwordInput = 'input[name=password]';
  const submitButton = 'button[type=submit]';

  it('should go to login page', () => {
    cy.visit('http://localhost:3000').title().should('eq', 'Iniciar sesión | Food Delivery');
  });

  it('can fill form', () => {
    cy.visit('/')
      .get(emailInput)
      .type('davidbarcenas@gmail.com')
      .get(passwordInput)
      .type('123456')
      .get(submitButton);
  });

  it('can see email / password validation errors', () => {
    cy.visit('/')
      .get(emailInput)
      .type('fail@mail')
      .get(passwordInput)
      .type('123')
      .get(submitButton)
      .click()
      .get(':nth-child(1) > .block')
      .should('have.text', 'Ingresa un correo válido')
      .get(':nth-child(2) > .block')
      .should('have.text', 'La contraseña debe tener al menos 6 caracteres');
  });
});
