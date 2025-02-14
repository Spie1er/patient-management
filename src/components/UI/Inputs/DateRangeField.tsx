import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { transformDateToString } from '../../../helpers/DataFunctions'
import { FaCalendarAlt } from 'react-icons/fa'

interface DateRangeFieldProps {
  name: string
  id?: string
  label?: string
  dateFormat?: string
  startName?: string
  endName?: string
  startDate: Date | null
  endDate: Date | null
  minDate?: Date
  maxDate?: Date
  isClearable?: boolean
  // placeholder?: string
  disabled?: boolean
  error?: string
  setFieldValue: (name: string, value: string | null | [Date | null, Date | null]) => void
}

const DateRangeField = (props: DateRangeFieldProps) => {
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className='block text-gray-700 dark:text-gray-300 mt-2'
      >
        {props.label}
      </label>

      <div className='relative'>
        <DatePicker
          id={props.id || props.name}
          selectsRange
          startDate={props.startDate}
          endDate={props.endDate}
          minDate={props.minDate}
          maxDate={props.maxDate}
          onChange={(update: [Date | null, Date | null]) => {
            const [start, end] = update
            if (props.startName && props.endName) {
              props.setFieldValue(props.startName, transformDateToString(start))
              props.setFieldValue(props.endName, transformDateToString(end))
            } else {
              props.setFieldValue(props.name, update)
            }
          }}
          className={`w-full mt-2 p-2 pl-10 border rounded-md shadow-sm focus:ring-2
             focus:ring-blue-500 transition duration-300  dark:bg-gray-700 dark:text-white ${
               props.error ? 'border-red-500' : 'border-gray-300'
             }`}
          //TODO Remove the commented code @Kote
          // className={`w-full p-2 pl-10 mt-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white ${
          //   props.error ? 'border-red-500' : 'border-gray-300'
          // }`}
          withPortal
          disabled={props.disabled}
        />
        <FaCalendarAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400' />
      </div>

      {props.error && <p className='text-sm text-red-500 mt-1'>{props.error}</p>}
    </>
  )
}

export default DateRangeField
