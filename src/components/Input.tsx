import { kebabCase } from 'lodash-es'
import React from 'react'
import { FloatingLabel, FormControl, FormControlProps } from 'react-bootstrap'

interface IInput extends FormControlProps {
  name?: string
  error?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'zip'
  controlId?: string
  label: string
}

const Input: React.FC<IInput & FormControlProps> = React.forwardRef<
  HTMLInputElement,
  IInput
>(({ error, controlId, type = 'text', label, ...props }, ref) => {
  return (
    <FloatingLabel label={label} controlId={controlId || kebabCase(label)}>
      <FormControl {...props} type={type} ref={ref} placeholder={label} />
      <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
    </FloatingLabel>
  )
})

Input.displayName = 'Input';


export default Input
