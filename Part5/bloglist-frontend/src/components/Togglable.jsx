import React, { useState,forwardRef,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Togglable = forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisisble = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisisble}>
        {props.children}
      </div>
      <div style={showWhenVisisble}>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
