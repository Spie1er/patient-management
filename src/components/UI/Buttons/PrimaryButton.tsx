import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

interface PrimaryButtonProps {
  loading?: boolean
  disabled?: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { t } = useTranslation()

  return (
    <button
      type={props.type || 'submit'}
      className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? t('buttonLoading') : props.text}
    </button>
  )
}

export default PrimaryButton
