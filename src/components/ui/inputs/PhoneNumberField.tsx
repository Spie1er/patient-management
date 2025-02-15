import { ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction } from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'

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
  hasOtpCheck?: boolean
  setOtpModalOpen?: Dispatch<SetStateAction<boolean>>
  otpButtonDisabled?: boolean
  otpVerified?: boolean
}

const TextField = (props: TextFieldProps) => {
  const { t } = useTranslation()

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
      <div className='relative'>
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

        {props.hasOtpCheck && props.setOtpModalOpen && (
          <div
            style={{
              position: 'absolute',
              top: '58%',
              right: '8px',
              transform: 'translateY(-50%)',
            }}
          >
            {props.otpVerified ? (
              <span className='px-2 py-1 rounded text-xs bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'>
                {t('verified')}
              </span>
            ) : (
              <PrimaryButton
                onClick={() => props.setOtpModalOpen!(true)}
                disabled={props.otpButtonDisabled}
                text={t('sendCode')}
                size='small'
              />
            )}
          </div>
        )}
      </div>

      {/* ერორის ადგილი */}
      {props.error && <p className='text-red-500 text-sm mt-1'>{props.error}</p>}
    </>
  )
}

export default TextField
