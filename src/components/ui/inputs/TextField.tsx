import { ChangeEventHandler, FocusEventHandler } from 'react'

interface TextFieldProps {
  id?: string
  name: string
  disabled?: boolean
  autocomplete?: string
  placeholder?: string
  value?: string | null
  handleChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  handleFocus?: FocusEventHandler
  handleBlur?: FocusEventHandler
  touched?: boolean
  label?: string
  required?: boolean
}

const TextField = (props: TextFieldProps) => {
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={`block text-gray-700 dark:text-gray-300 mt-2${
          props.required ? ' required' : ''
        }`}
      >
        {props.label}
      </label>
      <input
        id={props.id || props.name}
        name={props.name}
        type='text'
        className={`w-full p-2 mt-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white ${
          props.error ? 'border-red-500' : 'border-gray-300'
        }`}
        disabled={props.disabled}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.value || ''}
        placeholder={props.placeholder}
        onFocus={props.handleFocus}
      />

      {/* ერორის ადგილი */}
      {props.error && <p className='text-red-500 text-sm mt-1'>{props.error}</p>}
    </>
  )
}

export default TextField
