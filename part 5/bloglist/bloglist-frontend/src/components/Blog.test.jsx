import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    id: '1',
    title: 'Testing React Components',
    author: 'React Developer',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  }

  test('renders title and author but not URL or likes by default', () => {
    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()

    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    )

    // Check that title and author are rendered
    expect(screen.getByText('Testing React Components')).toBeInTheDocument()
    expect(screen.getByText('added by React Developer')).toBeInTheDocument()

    // Check that URL and likes are not visible by default
    expect(screen.queryByText('http://example.com')).not.toBeInTheDocument()
    expect(screen.queryByText('5 likes')).not.toBeInTheDocument()
  })

  test('shows URL and likes when view button is clicked', async () => {
    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    )

    // Click the view button
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    // Check that URL and likes are now visible
    expect(screen.getByText('http://example.com')).toBeInTheDocument()
    expect(screen.getByText('5 likes')).toBeInTheDocument()
  })

  test('calls event handler twice when like button is clicked twice', async () => {
    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    )

    // First click the view button to show the like button
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    // Click the like button twice
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Check that updateBlog was called twice
    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)

    // Check that it was called with the correct parameters
    expect(mockUpdateBlog).toHaveBeenCalledWith(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
  })
})
