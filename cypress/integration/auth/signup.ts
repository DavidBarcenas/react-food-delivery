describe('signup', () => {
  const emailInput = 'input[name=email]';
  const passwordInput = 'input[name=password]';
  const confirmPasswordInput = 'input[name=repeatPassword]';
  const submitButton = 'button[type=submit]';
  const user = cy;

  it('should see email / password validation errors', () => {
    user.visit('/');
    user.findByText(/crea una cuenta/i).click();
    user
      .get(emailInput)
      .type('fail@mail')
      .get(passwordInput)
      .type('1234')
      .get(confirmPasswordInput)
      .type('123')
      .get(submitButton)
      .click();
    user.findAllByRole('alert').eq(0).should('have.text', 'Ingresa un correo válido');
    user
      .findAllByRole('alert')
      .eq(1)
      .should('have.text', 'La contraseña debe tener al menos 6 caracteres');
    user.findAllByRole('alert').eq(2).should('have.text', 'Las contraseñas no coinciden');
    user.get(emailInput).clear().get(passwordInput).clear();
    user.findAllByRole('alert').eq(0).should('have.text', 'El correo es requerido');
    user.findAllByRole('alert').eq(1).should('have.text', 'La contraseña es requerida');
  });

  it('should be able to create account', () => {
    user.intercept('http://localhost:4000/graphql', request => {
      const {operationName} = request.body;
      if (operationName === 'createAccountMutation') {
        request.reply(res => {
          res.send({
            fixtures: 'auth/signup.json',
          });
        });
      }
    });
    user
      .visit('/signup')
      .get(emailInput)
      .type('test@mail.com')
      .get(passwordInput)
      .type('secret')
      .get(confirmPasswordInput)
      .type('secret')
      .get(submitButton)
      .click();
    user.wait(1000);
    user.title().should('eq', 'Iniciar sesión | Food Delivery');
    user.login('test@mail.com', 'secret');
  });
});
