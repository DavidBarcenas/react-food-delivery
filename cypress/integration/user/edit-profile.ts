describe('edit profile', () => {
  const user = cy;

  beforeEach(() => user.login('test@mail.com', 'secret'));

  it('go to edit profile from header ', () => {
    user.get('a[href="/edit-profile"]').click();
    user.title().should('eq', 'Información de contacto | Food Delivery');
  });

  it('change email', () => {
    user.intercept('POST', 'http://localhost:4000/graphql', request => {
      if (request.body.operationName === 'editProfile') {
        request.body.variables.input.email = 'test@mail.com';
      }
    });
    user.visit('/edit-profile');
    user.get('input[name=email]').clear().type('new@mail.com').get('button[type=submit]').click();
  });
});
