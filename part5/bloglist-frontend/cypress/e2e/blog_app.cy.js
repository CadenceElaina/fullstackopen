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

      it('one can be deleted', function() {
        cy.contains('third blog').parent().find('button').as('thirdButton')
        cy.get('@thirdButton').click()
        cy.get('@thirdButton')
        .get('.remove-button')
        .eq(2)
        .should('contain', 'remove')
        .click()

        cy.get('html').should('not.contain', 'third blog')
        cy.contains('Blog removed')
      })

      it('blogs are ordered according to to likes with the blog with the most likes being first', function(){
        cy.contains('first blog').parent().find('button').as('firstButton').click()
        cy.contains('second blog').parent().find('button').as('secondButton').click()
        cy.contains('third blog').parent().find('button').as('thirdButton').click()

        cy.get('.like-button')
        .eq(2)
        .click()
        .wait(500)
        cy.get('.like-button')
        .eq(2)
        .click()
        .wait(500)
        cy.get('.like-button')
        .eq(1)
        .click()
        .wait(500)


        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
      })
      describe('when there are more than one users', function () {
        beforeEach(function () {
          cy.contains('logout').click()
          cy.request('POST', 'http://localhost:3003/api/testing/reset')
          const user = {
            name: 'test1',
            username: 'test1',
            password: 'test1'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user)
          cy.visit('http://localhost:3000')
        })

        it('only the creator can see the delete button of a blog, not anyone else.', function() {
          cy.contains('login').click()
          cy.get('#username').type('test1')
          cy.get('#password').type('test1')
          cy.get('#login-button').click()
    
          cy.contains('test1 logged in')
          cy.get('html').should('not.contain', '.remove-button')
        })
      })
    })
  })
})