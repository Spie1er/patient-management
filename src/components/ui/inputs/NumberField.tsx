import { ChangeEventHandler, FocusEventHandler } from 'react'

interface NumberFieldProps {
  id?: string
  name: string
  disabled?: boolean
  autocomplete?: string
  placeholder?: string
  value?: number | null
  handleChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  handleFocus?: FocusEventHandler
  handleBlur?: FocusEventHandler
  touched?: boolean
  label?: string
}

const NumberField = (props: NumberFieldProps) => {
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className='block text-gray-700 dark:text-gray-300 mt-2'
      >
        {props.label}
      </label>

      <input
        id={props.id || props.name}
        name={props.name}
        type='number'
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
      {props.touched && props.error && <p className='text-red-500 text-sm mt-1'>{props.error}</p>}
    </>
  )
}

export default NumberField
