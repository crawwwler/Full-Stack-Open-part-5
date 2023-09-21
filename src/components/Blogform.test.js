import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from './Blogform'


test('testing form', async () => {

    const mockHandler = jest.fn()

    render(<Blogform createFunc={mockHandler} />)

    const user = userEvent.setup()
    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const button = screen.getByText('create')

    await user.type(title, 'writing a test...')
    await user.type(author, 'some tester')
    await user.type(url, 'test.x')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('writing a test...')
    expect(mockHandler.mock.calls[0][0].author).toBe('some tester')
    expect(mockHandler.mock.calls[0][0].url).toBe('test.x')
})