import { useState } from 'react'

const Blogform = ({ createFunc }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')


    const handleForm = event => {
        event.preventDefault()
        createFunc({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (
        <div>
            <h2>create note</h2>
            <form onSubmit={handleForm}>
                <div>
                    title:
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder='title'
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder='author'
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder='url'
                    />
                </div>
                <button id="subbutton" type="submit">create</button>
            </form>
        </div>
    )

}

export default Blogform