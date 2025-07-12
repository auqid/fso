import { React, useImperativeHandle, useState, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'
  const [visible, setVisible] = useState(false)

  const toggle = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggle,
    }
  })
  return (
    <>
      {visible ? (
        <div>
          {props.children}
          <button onClick={toggle}>cancel</button>
        </div>
      ) : (
        <button onClick={toggle}>{props.buttonLabel}</button>
      )}
    </>
  )
})

export default Togglable
