import { useState } from 'react'

const Blog = ({ blog, updateFunc, deleteFunc, creator }) => {

    const [complete, setComplete] = useState(false)

    //console.log('the blog obj => ', blog)

    const toggleComplete = () => {
        setComplete(!complete)
    }

    const deleteButton = () => {
        if (blog.user.length === 0) {
            return null
        } else {
            return (
                <div>
                    {creator.username === blog.user[0].username &&
            <div>
                <button onClick={deleteFunc}>remove</button>
            </div>}
                </div>
            )
        }
    }


    const handleUpdating = () => {
        const id = blog.id
        const nuBlog = { ...blog, likes: blog.likes + 1 }
        updateFunc(nuBlog, id)
    }

    const fullDetail = () => {
        return (
            <div>
                {blog.title} by {blog.author}
                <button onClick={toggleComplete}>hide</button>
                <br />
                <a href={blog.url}>{blog.url}</a>
                <br />
        likes {blog.likes}
                <button onClick={handleUpdating}>like</button>
                <br />
                {blog.user.length === 0 ? 'name is not defined' : blog.user[0].name}
                <br />
                {deleteButton()}
            </div>
        )
    }

    const summaryBlog = () => {
        return (
            <div>
                {blog.title} by {blog.author}
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