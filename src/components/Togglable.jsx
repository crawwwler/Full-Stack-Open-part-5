import { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hide = { display: visible ? 'none' : '' }
    const show = { display: visible ? '' : 'none' }

    const toggleTheVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return { toggleTheVisibility }
    })

    return (
        <div>
            <div style={hide}>
                <button onClick={toggleTheVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={show}>
                {props.children}
                <button onClick={toggleTheVisibility}>cancel</button>
            </div>
        </div>
    )
})


Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable