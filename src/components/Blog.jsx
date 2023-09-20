import { useState } from "react"

const Blog = ({ blog, updateFunc }) => {

  const [complete, setComplete] = useState(false)

  const toggleComplete = () => {
    setComplete(!complete)
  }


  const handleUpdating = () => {
    const id = blog.id
    const nuBlog = { ...blog, likes: blog.likes + 1 }
    updateFunc(nuBlog, id)
  }

  const fullDetail = () => {
    return (
      <div>
        {blog.title}
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={handleUpdating}>like</button>
        <br />
        {blog.author}
        <br />
        <button onClick={toggleComplete}>hide</button>
      </div>
    )
  }

  const summaryBlog = () => {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleComplete}>show</button>
      </div>
    )
  }

  return (
    <div>
      <div className="blog">
        {complete ? fullDetail() : summaryBlog()}
      </div>
      <br />
    </div>
  )

}

export default Blog