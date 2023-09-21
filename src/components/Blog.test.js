import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component', () => {
    const blog = {
        title: 'test the app',
        author: 'tester',
        url: 'test.x',
        likes: 0,
        user: []
    }

    test('title and author will render , but not likes and url by default', () => {

        // rendering the specific component we are testing
        const { container } = render(<Blog blog={blog} />)

        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent('test the app by tester')
        expect(div).not.toHaveTextContent('likes')
        expect(div).not.toHaveTextContent(blog.url)
    })


    test('after clicking on show, url and likes also involves', async () => {

        render(<Blog blog={blog} />)

        const user = userEvent.setup()
        const button = screen.getByText('show')

        expect(screen.queryByText(`${blog.url}`)).not.toBeInTheDocument()
        expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument()

        await user.click(button)

        expect(screen.getByText(`${blog.url}`, { exact: false })).toBeDefined()
        expect(screen.getByText(`likes ${blog.likes}`, { exact: false })).toBeDefined()

    })

    test('clicking twice on like ', async () => {

        const mockHandler = jest.fn()

        render(<Blog blog={blog} updateFunc={mockHandler} />)

        const user = userEvent.setup()
        const showBut = screen.getByText('show')
        await user.click(showBut)

        const likeBut = screen.getByText('like')
        await user.click(likeBut)
        await user.click(likeBut)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

