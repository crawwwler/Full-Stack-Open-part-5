describe('blogapp tests', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'tester',
            name: 'test',
            password: 'Test1234'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:5173')
    })

    it('login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
        cy.contains('Login')
    })

    describe('login', function () {
        it('login with wrong creds will fail', function () {
            cy.get('#username').type('something')
            cy.get('#password').type('something')
            cy.contains('Login').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })

        it('correct login', function () {
            cy.get('#username').type('tester')
            cy.get('#password').type('Test1234')
            cy.contains('Login').click()

            cy.contains('test logged in')
            cy.contains('new note')
            cy.contains('Logout')
        })
    })

    describe('logged in ', function () {
        beforeEach(function () {
            cy.login({ username: 'tester', password: 'Test1234' })
        })

        it('A blog can be created', function () {
            cy.contains('new note').click()

            cy.get('#title').type('test blog')
            cy.get('#author').type('tester')
            cy.get('#url').type('www.tst.com')
            cy.get('#subbutton').click()

            cy.contains('test blog by tester')
        })

        describe('note created', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'something', author: 'someone', url: 'www.some.com' })
            })
            it('user can like a blog', function () {
                cy.contains('something by someone').parent().contains('show').click()
                cy.get('#likebut').click()
                cy.contains('something by someone').parent().contains('likes 1')
            })

            it('users can delete their blogs', function () {
                cy.contains('something by someone').parent().contains('show').click()
                cy.get('#delbut').click()
                cy.get('.blog').should('not.exist')
            })

            it('user cannot delete other users blogs', function () {
                cy.contains('Logout').click()

                const helper = {
                    username: 'another',
                    password: 'Another00'
                }
                cy.request('POST', 'http://localhost:3003/api/users', helper)
                cy.login(helper)
                cy.contains('something by someone').parent().contains('show').click()
                cy.contains('something by someone').parent().contains('remove').should('not.exist')
            })
        })

        it('blogs shown in order', function () {
            cy.createBlog({ title: '1st blog', author: 'first', url: '1.com', likes: 10 })
            cy.createBlog({ title: '2nd blog', author: 'second', url: '2.com', likes: 8 })
            cy.createBlog({ title: '3rd blog', author: 'third', url: '3.com', likes: 4 })
            cy.createBlog({ title: '4th blog', author: 'fourth', url: '4.com', likes: 1 })

            cy.get('.blog').eq(0).should('contain', '1st blog')
            cy.get('.blog').eq(1).should('contain', '2nd blog')
            cy.get('.blog').eq(2).should('contain', '3rd blog')
            cy.get('.blog').eq(3).should('contain', '4th blog')
        })
    })
})
