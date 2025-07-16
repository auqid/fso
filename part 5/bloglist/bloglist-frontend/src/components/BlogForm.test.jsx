import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('calls event handler with correct details when a new blog is created', async () => {
    const mockHandleSave = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSave={mockHandleSave} />)

    // Find the input fields and submit button
    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByTestId('create-button')

    // Fill in the form
    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://test-url.com')

    // Submit the form
    await user.click(createButton)

    // Check that handleSave was called with correct details
    expect(mockHandleSave).toHaveBeenCalledTimes(1)
    expect(mockHandleSave).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://test-url.com',
    })
  })

  test('form fields are cleared after submission', async () => {
    const mockHandleSave = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSave={mockHandleSave} />)

    // Find the input fields and submit button
    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByTestId('create-button')

    // Fill in the form
    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://test-url.com')

    // Submit the form
    await user.click(createButton)

    // Check that form fields are cleared
    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(urlInput.value).toBe('')
  })
})
