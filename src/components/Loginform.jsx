import { useState } from 'react'

const Loginform = ({ loginFunc }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = event => {
        event.preventDefault()
        loginFunc({
            username,
            password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="subbutton" type="submit">Login</button>
        </form>
    )
}

export default Loginform