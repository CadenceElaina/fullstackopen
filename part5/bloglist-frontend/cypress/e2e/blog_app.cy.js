describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    }) 
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'mluukkai', password: 'salainen'})
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: "A blog created by cypress",
        author: "Cypress",
        url: "https://www.test.com/",
      });

      cy.contains("A blog created by cypress")
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
        cy.createBlog({
          title: "second blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
        cy.createBlog({
          title: "third blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
      });

      it('one of those can be liked', function() {
        cy.contains('second blog').parent().find('button').as('secondButton')
        cy.get('@secondButton').click()
        cy.get('@secondButton')
        .get('.like-button')
        .eq(1)
        .should('contain', 'like')
        .click()

        cy.contains('Likes: 1')
      })
    })
  })
})