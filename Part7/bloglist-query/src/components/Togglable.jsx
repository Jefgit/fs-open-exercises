import React, { useState,forwardRef,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from './styles/Button.styled'
import { CreateNewForm, StyledCancelBtn } from './styles/CreateNewForm.styled'

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
        <Button onClick={toggleVisibility} bg={`#FFB703`}>{props.buttonLabel}</Button>
      </div>
      <CreateNewForm style={showWhenVisisble}>
        <StyledCancelBtn onClick={toggleVisibility}>x</StyledCancelBtn>
        {props.children}
      </CreateNewForm>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
