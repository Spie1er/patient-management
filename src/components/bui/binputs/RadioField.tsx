interface RadioFieldProps {
  name: string
  onChange: (name: string, value: number) => void
  value?: number
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  id?: string
  className?: string
  radiolabel: string
}
const RadioField = (props: RadioFieldProps) => {
  return (
    <label className='inline-flex items-center'>
      <input
        id={props.id}
        name={props.name}
        type='radio'
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        disabled={props.disabled}
        onChange={(val) => props.onChange(props.name, parseInt(val.target.value))}
        value={props.value}
        className='form-radio text-blue-500'
      />
      <span className='ml-2 text-gray-700 dark:text-gray-300'>{props.radiolabel}</span>
    </label>
  )
}

export default RadioField
