import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginserv from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notif, setNotif] = useState(null)

    const refBlogForm = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )
    }, [blogs])


    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const userX = JSON.parse(loggedUser)
            setUser(userX)
            blogService.setToken(userX.token)
        }
    }, [])


    const handleLogin = async (userInput) => {
        try {
            const userX = await loginserv.login(userInput)
            window.localStorage.setItem('loggedUser', JSON.stringify(userX))
            setUser(userX)
            blogService.setToken(userX.token)
        } catch (error) {
            console.log(error.message)
            setNotif({
                text: 'wrong username or password',
                error: true
            })
            setTimeout(() => {
                setNotif(null)
            }, 5000)
        }
    }

    const handleLogOut = (event) => {
        event.preventDefault()
        setUser(null)
        blogService.setToken('')
        window.localStorage.removeItem('loggedUser')

    }

    const createBlog = async (blogForm) => {
        try {
            const savedBlog = await blogService.create(blogForm)
            setBlogs(blogs.concat(savedBlog))
            setNotif({
                text: `a new blog ${blogForm.title} by ${blogForm.author} added`,
                error: false
            })
            setTimeout(() => {
                setNotif(null)
            }, 5000)
        } catch (error) {
            console.log(error.message)
        }
        refBlogForm.current.toggleTheVisibility()
    }


    const updateBlog = async (obj, id) => {
        const response = await blogService.update(obj, id)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
    }


    const deleteBlog = async (id) => {
        const blog = blogs.find(blog => blog.id === id)
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(id)
            setBlogs(blogs.filter(blog => blog.id !== id))
        }
    }


    const loginForm = () => {
        return (
            <Loginform loginFunc={handleLogin} />
        )
    }


    const blogForm = () => {
        return (
            <Togglable buttonLabel='new note' ref={refBlogForm}>
                <Blogform createFunc={createBlog} />
            </Togglable>
        )
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification message={notif} />
                {loginForm()}
            </div>
        )
    }


    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notif} />
            {user && <div>
                <p>{user.name} logged in</p>
                <button onClick={handleLogOut}>Logout</button>
                {blogForm()}
            </div>}
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        updateFunc={updateBlog}
                        deleteFunc={() => deleteBlog(blog.id)}
                        creator={user} />
                )}
            </div>
            <br />
        </div>
    )
}

export default App