import { Fragment } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
import { FaChevronDown, FaCheck } from 'react-icons/fa'
import { SelectType } from '../../../types/GeneralTypes'
import { useTranslation } from 'react-i18next'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SelectFieldProps {
  id?: string
  name: string
  options: SelectType[]
  value?: SelectType | null
  onChange: (name: string, value: SelectType) => void
  label?: string
  error?: string
  placeholder?: string
}

const SelectField = (props: SelectFieldProps) => {
  const { options, value, onChange, label, error, id, name, placeholder } = props

  const { t } = useTranslation()

  return (
    <div className='w-full'>
      <label htmlFor={id || name} className='block text-gray-700 mt-2 dark:text-gray-300'>
        {label}
      </label>
      <Listbox
        value={value || { id: '', label: '' }}
        onChange={(val: SelectType | null) => {
          if (val !== null) {
            onChange(name, val)
          }
        }}
      >
        {() => (
          <div className='relative mt-2'>
            <ListboxButton
              id={id || name}
              className={`w-full p-2 min-h-[40px] border rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <span className='block truncate text-left'>
                {value?.label ? t(`${value?.label}`) : placeholder}
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <FaChevronDown className='h-4 w-4 text-gray-400' aria-hidden='true' />
              </span>
            </ListboxButton>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <ListboxOptions
                as='ul'
                className='absolute z-10 mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg max-h-60 overflow-auto focus:outline-none'
              >
                {options.map((option) => (
                  <ListboxOption
                    as='li'
                    key={option.id}
                    value={option}
                    className={({ active }: { active: boolean }) =>
                      classNames(
                        active ? 'text-white bg-blue-600' : 'text-gray-900 dark:text-white',
                        'cursor-pointer select-none relative p-2',
                      )
                    }
                  >
                    {({ selected, active }: { selected: boolean; active: boolean }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-2',
                            )}
                          >
                            <FaCheck className='h-4 w-4' aria-hidden='true' />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>
      {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
    </div>
  )
}

export default SelectField
