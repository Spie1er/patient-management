import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

interface SecondaryButtonProps {
  loading?: boolean
  disabled?: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { t } = useTranslation()
  return (
    <button
      type={props.type || 'submit'}
      className={`bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-300 ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? t('buttonLoading') : props.text}
    </button>
  )
}

export default SecondaryButton
