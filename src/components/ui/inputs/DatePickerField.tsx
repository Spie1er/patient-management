import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { transformDateToString } from '../../../helpers/DataFunctions'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../buttons/PrimaryButton'

interface DatePickerFieldProps {
  name: string
  id?: string
  label?: string
  minDate?: Date
  maxDate?: Date
  isClearable?: boolean
  placeholder?: string
  disabled?: boolean
  error?: string
  value: string | null
  setFieldValue: (name: string, value: Date | string | null) => void
  required?: boolean
  hasToday?: boolean
}

const DatePickerField = (props: DatePickerFieldProps) => {
  const { t } = useTranslation()

  const handleTodayClick = () => {
    const today = new Date()
    props.setFieldValue(props.name, transformDateToString(today))
  }

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

      <div className='relative customDatePickerWidth'>
        <DatePicker
          id={props.id || props.name}
          minDate={props.minDate}
          maxDate={props.maxDate}
          onChange={(date) =>
            date && props.setFieldValue(props.name, transformDateToString(date as Date))
          }
          value={props.value || ''}
          placeholderText={props.placeholder}
          className={`w-full mt-2 p-2 pl-10 border rounded-md shadow-sm focus:ring-2
             focus:ring-blue-500 transition duration-300  dark:bg-gray-700 dark:text-white ${
               props.error ? 'border-red-500' : 'border-gray-300'
             }`}
          disabled={props.disabled}
          autoComplete='off'
        />
        <FaCalendarAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 cursor-pointer' />

        <div
          style={{
            position: 'absolute',
            top: '58%',
            right: '8px',
            transform: 'translateY(-50%)',
          }}
        >
          {!props.disabled && props.hasToday && (
            <PrimaryButton
              text={t('today')}
              type='button'
              onClick={handleTodayClick}
              size='small'
            />
          )}
        </div>
      </div>

      {props.error && <p className='text-sm text-red-500 mt-1'>{props.error}</p>}
    </>
  )
}

export default DatePickerField
