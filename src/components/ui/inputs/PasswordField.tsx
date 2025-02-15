import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface PasswordFieldProps {
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
}

const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <label htmlFor={props.id || props.name} className='block text-gray-700 dark:text-gray-300'>
        {props.label}
      </label>

      <div className='relative'>
        <input
          id={props.id || props.name}
          name={props.name}
          type={showPassword ? 'text' : 'password'}
          className={`w-full p-2 mt-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white pr-10 ${
            props.error ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={props.disabled}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.value || ''}
          placeholder={props.placeholder}
          onFocus={props.handleFocus}
        />

        {/* პაროლის გამოჩენა/დამალვის ღილაკი */}
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute top-1/2 -translate-y-1/2 right-3 transform text-gray-500 dark:text-gray-400 mt-1'
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
      {/* ერორის ადგილი */}
      {props.error && <p className='text-red-500 text-sm mt-1'>{props.error}</p>}
    </div>
  )
}

export default PasswordField
